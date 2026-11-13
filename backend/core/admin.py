from django.contrib import admin

from .models import (
    BlogPost,
    Enquiry,
    Product,
    ProductScreenshot,
    Project,
    ProjectScreenshot,
    Service,
    SiteContent,
    Testimonial,
)


class ProjectScreenshotInline(admin.TabularInline):
    model = ProjectScreenshot
    extra = 1


class ProductScreenshotInline(admin.TabularInline):
    model = ProductScreenshot
    extra = 1


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title", "order", "is_published", "updated_at"]
    list_editable = ["order", "is_published"]
    search_fields = ["title", "summary"]
    prepopulated_fields = {"slug": ["title"]}


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "is_featured", "is_published", "order"]
    list_editable = ["is_featured", "is_published", "order"]
    list_filter = ["category", "is_featured", "is_published"]
    search_fields = ["title", "client", "summary"]
    prepopulated_fields = {"slug": ["title"]}
    inlines = [ProjectScreenshotInline]
    fieldsets = [
        (None, {"fields": ["title", "slug", "category", "client", "summary", "cover"]}),
        ("Case study", {"fields": ["description", "challenge", "solution", "results", "technologies"]}),
        ("Links & visibility", {"fields": ["live_url", "is_featured", "is_published", "order"]}),
    ]


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "status", "pricing", "is_published", "order"]
    list_editable = ["status", "is_published", "order"]
    list_filter = ["status", "is_published"]
    search_fields = ["name", "tagline"]
    prepopulated_fields = {"slug": ["name"]}
    inlines = [ProductScreenshotInline]


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "status", "author_name", "published_at"]
    list_filter = ["status"]
    search_fields = ["title", "excerpt", "body"]
    prepopulated_fields = {"slug": ["title"]}
    date_hierarchy = "published_at"
    fieldsets = [
        (None, {"fields": ["title", "slug", "excerpt", "body", "cover", "tags", "author_name"]}),
        ("Publishing", {"fields": ["status", "published_at"]}),
        ("SEO", {"fields": ["seo_title", "seo_description"], "classes": ["collapse"]}),
    ]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["name", "company", "is_published", "order"]
    list_editable = ["is_published", "order"]
    search_fields = ["name", "company", "quote"]


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "company", "service", "status", "created_at"]
    list_editable = ["status"]
    list_filter = ["status", "service", "created_at"]
    search_fields = ["name", "email", "company", "message"]
    date_hierarchy = "created_at"
    # What the visitor submitted is a record: staff can triage it, not rewrite it.
    readonly_fields = ["name", "email", "company", "service", "message", "ip_address", "created_at"]
    fields = readonly_fields + ["status", "internal_notes"]

    def has_add_permission(self, request):
        return False


@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ["label", "key", "value", "updated_at"]
    search_fields = ["key", "label", "value"]
