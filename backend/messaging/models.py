from django.db import models
from django.conf import settings

class Conversation(models.Model):
    """
    Conversation model for messaging between users
    """
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Conversation {self.id} - {', '.join([str(p) for p in self.participants.all()])}"

    class Meta:
        ordering = ['-updated_at']

class Message(models.Model):
    """
    Message model for individual messages in a conversation
    """
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender.username} at {self.created_at}"

    class Meta:
        ordering = ['created_at']

class Notification(models.Model):
    """
    Notification model for system notifications
    """
    NOTIFICATION_TYPES = (
        ('message', 'New Message'),
        ('course', 'Course Update'),
        ('assignment', 'Assignment'),
        ('quiz', 'Quiz'),
        ('discussion', 'Discussion'),
        ('grade', 'Grade'),
        ('system', 'System'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    related_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.get_notification_type_display()} for {self.user.username}: {self.title}"

    class Meta:
        ordering = ['-created_at']
