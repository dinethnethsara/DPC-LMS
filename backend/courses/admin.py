from django.contrib import admin
from .models import Course, Enrollment, Module, Content

class ModuleInline(admin.StackedInline):
    model = Module
    extra = 1

class EnrollmentInline(admin.TabularInline):
    model = Enrollment
    extra = 1
    readonly_fields = ('date_enrolled',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'instructor', 'is_published', 'created_at')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'code', 'description')
    inlines = [ModuleInline, EnrollmentInline]
    date_hierarchy = 'created_at'

class ContentInline(admin.StackedInline):
    model = Content
    extra = 1

@admin.register(Module)
class ModuleAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'order')
    list_filter = ('course',)
    search_fields = ('title', 'description')
    inlines = [ContentInline]

@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('title', 'module', 'content_type', 'created_at')
    list_filter = ('content_type', 'created_at')
    search_fields = ('title', 'text_content')

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'date_enrolled', 'is_active')
    list_filter = ('is_active', 'date_enrolled')
    search_fields = ('student__username', 'course__title')
