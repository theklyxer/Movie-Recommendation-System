from django.contrib import admin
from .models import Member, user

class MemberAdmin(admin.ModelAdmin):
  list_display = ("firstname", "lastname", "joined_date",)

class userAdmin(admin.ModelAdmin):
  list_display = ("email",)
# Register your models here.
admin.site.register(Member, MemberAdmin)
admin.site.register(user, userAdmin)
