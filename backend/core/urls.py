from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("services", views.ServiceViewSet, basename="service")
router.register("projects", views.ProjectViewSet, basename="project")
router.register("products", views.ProductViewSet, basename="product")
router.register("posts", views.BlogPostViewSet, basename="post")

urlpatterns = [
    path("", include(router.urls)),
    path("testimonials/", views.TestimonialList.as_view(), name="testimonials"),
    path("content/", views.SiteContentView.as_view(), name="content"),
    path("enquiries/", views.EnquiryCreate.as_view(), name="enquiry-create"),
]
