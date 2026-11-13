"""
Bootstrap a fresh install: role groups + starter content.

    python manage.py seed            # roles + content (skips rows that already exist)
    python manage.py seed --roles    # roles only

Content comes from frontend/content/seed.json — the same file the website
falls back to when the API is unreachable — so the two never drift apart.
"""
import json
from pathlib import Path

from django.conf import settings
from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand, CommandError
from django.utils.dateparse import parse_datetime

from core.models import BlogPost, Product, Project, Service, SiteContent

DEFAULT_FILE = Path(settings.BASE_DIR).parent / "frontend" / "content" / "seed.json"

CONTENT_MODELS = [
    "service", "project", "projectscreenshot", "product", "productscreenshot",
    "blogpost", "testimonial", "sitecontent",
]

# Role-based access control: group name -> {model: [actions]}
ROLES = {
    "Administrator": {m: ["add", "change", "delete", "view"] for m in CONTENT_MODELS + ["enquiry"]},
    "Content Editor": {m: ["add", "change", "delete", "view"] for m in CONTENT_MODELS},
    "Sales": {"enquiry": ["change", "view"], "project": ["view"], "product": ["view"], "service": ["view"]},
}


class Command(BaseCommand):
    help = "Create role groups and starter website content."

    def add_arguments(self, parser):
        parser.add_argument("--roles", action="store_true", help="Only create role groups")
        parser.add_argument("--file", default=str(DEFAULT_FILE), help="Path to seed JSON")

    def handle(self, *args, **opts):
        self.seed_roles()
        if not opts["roles"]:
            self.seed_content(Path(opts["file"]))

    def seed_roles(self):
        for name, grants in ROLES.items():
            group, _ = Group.objects.get_or_create(name=name)
            codenames = [f"{action}_{model}" for model, actions in grants.items() for action in actions]
            perms = Permission.objects.filter(content_type__app_label="core", codename__in=codenames)
            group.permissions.set(perms)
            self.stdout.write(f"Role '{name}': {perms.count()} permissions")

    def seed_content(self, path: Path):
        if not path.exists():
            raise CommandError(f"Seed file not found: {path}")
        data = json.loads(path.read_text(encoding="utf-8"))
        created = 0

        for key, item in data.get("content", {}).items():
            _, new = SiteContent.objects.get_or_create(key=key, defaults=item)
            created += new

        for order, item in enumerate(data.get("services", [])):
            _, new = Service.objects.get_or_create(slug=item["slug"], defaults={**item, "order": order})
            created += new

        for order, item in enumerate(data.get("projects", [])):
            fields = {k: v for k, v in item.items() if k not in {"cover", "screenshots"}}
            _, new = Project.objects.get_or_create(slug=item["slug"], defaults={**fields, "order": order})
            created += new

        for order, item in enumerate(data.get("products", [])):
            fields = {k: v for k, v in item.items() if k not in {"cover", "screenshots"}}
            _, new = Product.objects.get_or_create(slug=item["slug"], defaults={**fields, "order": order})
            created += new

        for item in data.get("posts", []):
            fields = {k: v for k, v in item.items() if k != "cover"}
            fields["published_at"] = parse_datetime(fields["published_at"])
            fields["status"] = BlogPost.Status.PUBLISHED
            _, new = BlogPost.objects.get_or_create(slug=item["slug"], defaults=fields)
            created += new

        self.stdout.write(self.style.SUCCESS(f"Seed complete: {created} new rows"))
