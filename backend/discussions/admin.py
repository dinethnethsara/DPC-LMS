from django.contrib import admin
from .models import DiscussionForum, DiscussionTopic, DiscussionReply

class DiscussionTopicInline(admin.TabularInline):
    model = DiscussionTopic
    extra = 1
    fields = ('title', 'created_by', 'created_at', 'is_pinned', 'is_closed')
    readonly_fields = ('created_at',)

@admin.register(DiscussionForum)
class DiscussionForumAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'created_at', 'is_active')
    list_filter = ('is_active', 'created_at')
    search_fields = ('title', 'description', 'course__title')
    inlines = [DiscussionTopicInline]

class DiscussionReplyInline(admin.TabularInline):
    model = DiscussionReply
    extra = 1
    fields = ('content', 'created_by', 'created_at', 'is_solution')
    readonly_fields = ('created_at',)

@admin.register(DiscussionTopic)
class DiscussionTopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'forum', 'created_by', 'created_at', 'is_pinned', 'is_closed')
    list_filter = ('is_pinned', 'is_closed', 'created_at')
    search_fields = ('title', 'content', 'created_by__username')
    inlines = [DiscussionReplyInline]

@admin.register(DiscussionReply)
class DiscussionReplyAdmin(admin.ModelAdmin):
    list_display = ('topic', 'created_by', 'created_at', 'parent_reply', 'is_solution')
    list_filter = ('is_solution', 'created_at')
    search_fields = ('content', 'created_by__username', 'topic__title')
