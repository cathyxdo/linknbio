from django.contrib import admin

# Register your models here.
from linklists.models import List, SocialMedia, Link

admin.site.register(List)
admin.site.register(SocialMedia)
admin.site.register(Link)
