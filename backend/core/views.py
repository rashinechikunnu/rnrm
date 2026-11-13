import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import BlogPost, Product, Project, Service, SiteContent, Testimonial
from .serializers import (
    BlogPostSerializer,
    EnquirySerializer,
    ProductSerializer,
    ProjectSerializer,
    ServiceSerializer,
    TestimonialSerializer,
)

logger = logging.getLogger(__name__)


class PublicReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    """Public content is read-only over the API; all editing happens in the admin."""

    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"
    pagination_class = None


class ServiceViewSet(PublicReadOnlyViewSet):
    queryset = Service.objects.filter(is_published=True)
    serializer_class = ServiceSerializer


class ProjectViewSet(PublicReadOnlyViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs = Project.objects.filter(is_published=True).prefetch_related("screenshots")
        if self.request.query_params.get("featured") in {"1", "true"}:
            qs = qs.filter(is_featured=True)
        return qs


class ProductViewSet(PublicReadOnlyViewSet):
    queryset = Product.objects.filter(is_published=True).prefetch_related("screenshots")
    serializer_class = ProductSerializer


class BlogPostViewSet(PublicReadOnlyViewSet):
    queryset = BlogPost.objects.filter(status=BlogPost.Status.PUBLISHED)
    serializer_class = BlogPostSerializer


class TestimonialList(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    pagination_class = None
    queryset = Testimonial.objects.filter(is_published=True)
    serializer_class = TestimonialSerializer


class SiteContentView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response(dict(SiteContent.objects.values_list("key", "value")))


class EnquiryThrottle(AnonRateThrottle):
    scope = "enquiry"


class EnquiryCreate(APIView):
    """Contact form endpoint. Write-only, throttled, honeypot-protected."""

    permission_classes = [permissions.AllowAny]
    authentication_classes = []  # public form: no session, so no CSRF token needed
    throttle_classes = [EnquiryThrottle]

    def post(self, request):
        serializer = EnquirySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = dict(serializer.validated_data)

        if data.pop("website", ""):
            # Honeypot tripped: pretend success, store nothing.
            return Response({"ok": True}, status=status.HTTP_201_CREATED)

        forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
        ip = forwarded.split(",")[0].strip() or request.META.get("REMOTE_ADDR")
        enquiry = serializer.Meta.model.objects.create(ip_address=ip or None, **data)

        if settings.ENQUIRY_NOTIFY_EMAILS:
            try:
                send_mail(
                    subject=f"New enquiry from {enquiry.name}",
                    message=(
                        f"Name: {enquiry.name}\nEmail: {enquiry.email}\nCompany: {enquiry.company}\n"
                        f"Service: {enquiry.service}\n\n{enquiry.message}"
                    ),
                    from_email=None,
                    recipient_list=settings.ENQUIRY_NOTIFY_EMAILS,
                )
            except Exception:  # the enquiry is saved; a mail outage must not fail the form
                logger.exception("Could not send enquiry notification email")

        return Response({"ok": True}, status=status.HTTP_201_CREATED)
