from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class TimeStamped(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Sluggable(models.Model):
    """Fills `slug` from SLUG_SOURCE on first save, keeping it unique."""

    SLUG_SOURCE = "title"
    slug = models.SlugField(max_length=140, unique=True, blank=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(getattr(self, self.SLUG_SOURCE))[:120] or "item"
            slug, n = base, 2
            while type(self).objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug, n = f"{base}-{n}", n + 1
            self.slug = slug
        super().save(*args, **kwargs)


def string_list():
    return []


class Service(Sluggable, TimeStamped):
    title = models.CharField(max_length=120)
    icon = models.CharField(max_length=40, default="code", help_text="Lucide icon key, e.g. code, globe, cloud, smartphone, plug, workflow")
    summary = models.CharField(max_length=240)
    description = models.TextField()
    benefits = models.JSONField(default=string_list, blank=True, help_text='List of strings, e.g. ["Faster delivery", "Lower cost"]')
    technologies = models.JSONField(default=string_list, blank=True, help_text="List of technology names")
    process = models.JSONField(default=string_list, blank=True, help_text='List of {"title": "...", "text": "..."} steps')
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "title"]

    def __str__(self):
        return self.title


class Project(Sluggable, TimeStamped):
    title = models.CharField(max_length=140)
    category = models.CharField(max_length=80, help_text="e.g. Web Application, SaaS, Mobile App")
    client = models.CharField(max_length=120, blank=True)
    summary = models.CharField(max_length=260)
    description = models.TextField(help_text="Case study body. Separate paragraphs with a blank line.")
    challenge = models.TextField(blank=True)
    solution = models.TextField(blank=True)
    results = models.JSONField(default=string_list, blank=True, help_text='List of {"value": "40%", "label": "faster onboarding"}')
    technologies = models.JSONField(default=string_list, blank=True)
    cover = models.ImageField(upload_to="projects/", blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class ProjectScreenshot(models.Model):
    project = models.ForeignKey(Project, related_name="screenshots", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="projects/screenshots/")
    caption = models.CharField(max_length=160, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.caption or f"Screenshot {self.pk}"


class Product(Sluggable, TimeStamped):
    SLUG_SOURCE = "name"

    class Status(models.TextChoices):
        LIVE = "live", "Live"
        BETA = "beta", "Beta"
        COMING_SOON = "coming_soon", "Coming soon"

    name = models.CharField(max_length=120)
    tagline = models.CharField(max_length=200)
    description = models.TextField()
    features = models.JSONField(default=string_list, blank=True, help_text='List of {"title": "...", "text": "..."}')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.COMING_SOON)
    pricing = models.CharField(max_length=160, blank=True, help_text='e.g. "From ₹1,999 / month" or "Contact us for pricing"')
    website_url = models.URLField(blank=True)
    cover = models.ImageField(upload_to="products/", blank=True)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class ProductScreenshot(models.Model):
    product = models.ForeignKey(Product, related_name="screenshots", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="products/screenshots/")
    caption = models.CharField(max_length=160, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.caption or f"Screenshot {self.pk}"


class BlogPost(Sluggable, TimeStamped):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLISHED = "published", "Published"

    title = models.CharField(max_length=180)
    excerpt = models.CharField(max_length=300)
    body = models.TextField(help_text="Plain text. Blank line = new paragraph. Start a line with '## ' for a heading, '- ' for a bullet.")
    cover = models.ImageField(upload_to="blog/", blank=True)
    tags = models.JSONField(default=string_list, blank=True)
    author_name = models.CharField(max_length=120, default="rnrm Technology")
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.DRAFT)
    published_at = models.DateTimeField(null=True, blank=True)
    seo_title = models.CharField(max_length=70, blank=True)
    seo_description = models.CharField(max_length=160, blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def save(self, *args, **kwargs):
        if self.status == self.Status.PUBLISHED and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Testimonial(TimeStamped):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=120, blank=True)
    company = models.CharField(max_length=120, blank=True)
    quote = models.TextField()
    photo = models.ImageField(upload_to="testimonials/", blank=True)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return f"{self.name} ({self.company})" if self.company else self.name


class Enquiry(TimeStamped):
    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In progress"
        WON = "won", "Won"
        CLOSED = "closed", "Closed"

    name = models.CharField(max_length=120)
    email = models.EmailField()
    company = models.CharField(max_length=160, blank=True)
    service = models.CharField(max_length=120, blank=True)
    message = models.TextField(max_length=5000)
    status = models.CharField(max_length=12, choices=Status.choices, default=Status.NEW)
    internal_notes = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "enquiries"

    def __str__(self):
        return f"{self.name} — {self.service or 'General'}"


class SiteContent(TimeStamped):
    """Editable key/value website copy (hero text, contact details, social links...)."""

    key = models.SlugField(max_length=80, unique=True, help_text="e.g. hero_headline, contact_email, whatsapp_number")
    label = models.CharField(max_length=120, help_text="What this value is used for")
    value = models.TextField(blank=True)

    class Meta:
        ordering = ["key"]
        verbose_name = "website content"
        verbose_name_plural = "website content"

    def __str__(self):
        return self.label
