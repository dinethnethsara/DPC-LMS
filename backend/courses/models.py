from django.db import models
from django.conf import settings

class Course(models.Model):
    """
    Course model for DPC LMS
    """
    title = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='courses_teaching')
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, through='Enrollment', related_name='courses_enrolled')
    cover_image = models.ImageField(upload_to='course_covers/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.code}: {self.title}"

    class Meta:
        ordering = ['-created_at']

class Enrollment(models.Model):
    """
    Enrollment model to track student enrollment in courses
    """
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_enrolled = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student.username} enrolled in {self.course.title}"

    class Meta:
        unique_together = ['student', 'course']

class Module(models.Model):
    """
    Module model for organizing course content
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.course.code} - {self.title}"

    class Meta:
        ordering = ['order']

class Content(models.Model):
    """
    Content model for storing different types of learning materials
    """
    CONTENT_TYPES = (
        ('text', 'Text'),
        ('file', 'File'),
        ('image', 'Image'),
        ('video', 'Video'),
        ('link', 'External Link'),
    )

    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='contents')
    title = models.CharField(max_length=200)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPES)
    text_content = models.TextField(blank=True)
    file = models.FileField(upload_to='course_files/', null=True, blank=True)
    url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['order']
