from django.contrib import admin
from .models import Task


class UserFilter(admin.SimpleListFilter):

    title = 'has user'
    parameter_name = 'user__isnull'

    def lookups(self, request, model_admin):

        return (
            ('False', 'has user'),
            ('True', 'has no user')
        )

    def queryset(self, request, queryset):
        if self.value() == 'False':
            return queryset.filter(user__isnull=False)
        if self.value() == 'True':
            return queryset.filter(user__isnull=True)

class TaskAdmin(admin.ModelAdmin):

    list_display = ('id', 'user', 'title')
    # search_fields = ('user',)
    list_filter = ('user', UserFilter)


admin.site.register(Task, TaskAdmin)
