from django.db import models
from django.conf import settings
from courses.models import Course

class DiscussionForum(models.Model):
    """
    Discussion forum model for course discussions
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='forums')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.course.code} - {self.title}"

    class Meta:
        ordering = ['-created_at']

class DiscussionTopic(models.Model):
    """
    Discussion topic model for forum topics
    """
    forum = models.ForeignKey(DiscussionForum, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='topics')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_pinned = models.BooleanField(default=False)
    is_closed = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-is_pinned', '-created_at']

class DiscussionReply(models.Model):
    """
    Discussion reply model for topic replies
    """
    topic = models.ForeignKey(DiscussionTopic, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='replies')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent_reply = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='child_replies')
    is_solution = models.BooleanField(default=False)

    def __str__(self):
        return f"Reply by {self.created_by.username} on {self.created_at}"

    class Meta:
        ordering = ['created_at']
        verbose_name_plural = 'Discussion replies'
