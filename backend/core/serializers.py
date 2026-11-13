from rest_framework import serializers

from .models import (
    BlogPost,
    Enquiry,
    Product,
    ProductScreenshot,
    Project,
    ProjectScreenshot,
    Service,
    Testimonial,
)


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["slug", "title", "icon", "summary", "description", "benefits", "technologies", "process"]


class ProjectScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectScreenshot
        fields = ["image", "caption"]


class ProjectSerializer(serializers.ModelSerializer):
    screenshots = ProjectScreenshotSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "slug", "title", "category", "client", "summary", "description", "challenge", "solution",
            "results", "technologies", "cover", "screenshots", "live_url", "is_featured",
        ]


class ProductScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductScreenshot
        fields = ["image", "caption"]


class ProductSerializer(serializers.ModelSerializer):
    screenshots = ProductScreenshotSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "slug", "name", "tagline", "description", "features", "status", "pricing",
            "website_url", "cover", "screenshots",
        ]


class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            "slug", "title", "excerpt", "body", "cover", "tags", "author_name",
            "published_at", "seo_title", "seo_description",
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["name", "role", "company", "quote", "photo"]


class EnquirySerializer(serializers.ModelSerializer):
    # Honeypot: real visitors never see or fill this field; bots usually do.
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = Enquiry
        fields = ["name", "email", "company", "service", "message", "website"]

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Please enter your name.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 20:
            raise serializers.ValidationError("Please tell us a little more about your project (at least 20 characters).")
        return value
