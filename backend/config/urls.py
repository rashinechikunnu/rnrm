from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

admin.site.site_header = "rnrm Technology"
admin.site.site_title = "rnrm Admin"
admin.site.index_title = "Website dashboard"

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("core.urls")),
    path("health/", lambda request: JsonResponse({"status": "ok"})),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
