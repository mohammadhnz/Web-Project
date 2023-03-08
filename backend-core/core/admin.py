from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from core.models import BaseAccount


@admin.register(BaseAccount)
class BaseAccountAdmin(SimpleHistoryAdmin):
    list_display = (
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'gender',
        'is_staff',
        'phone_number',
    )
    readonly_fields = (
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'gender',
        'phone_number',
    )
    search_fields = (
        'username',
        'first_name',
        'last_name',
        'phone_number',
    )
    list_filter = (
        'gender',
        'is_staff',
    )
