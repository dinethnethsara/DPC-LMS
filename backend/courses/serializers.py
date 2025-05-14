from rest_framework import serializers
from .models import Course, Enrollment, Module, Content
from users.serializers import UserSerializer

class ContentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Content model
    """
    class Meta:
        model = Content
        fields = ['id', 'title', 'content_type', 'text_content', 'file', 'url', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class ModuleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Module model
    """
    contents = ContentSerializer(many=True, read_only=True)
    
    class Meta:
        model = Module
        fields = ['id', 'title', 'description', 'order', 'contents']
        read_only_fields = ['id']

class EnrollmentSerializer(serializers.ModelSerializer):
    """
    Serializer for the Enrollment model
    """
    student = UserSerializer(read_only=True)
    
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'date_enrolled', 'is_active']
        read_only_fields = ['id', 'date_enrolled']

class CourseSerializer(serializers.ModelSerializer):
    """
    Serializer for the Course model
    """
    instructor = UserSerializer(read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'code', 'description', 'instructor', 'cover_image', 
                 'created_at', 'updated_at', 'is_published']
        read_only_fields = ['id', 'created_at', 'updated_at']

class CourseDetailSerializer(serializers.ModelSerializer):
    """
    Detailed serializer for the Course model
    """
    instructor = UserSerializer(read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)
    enrollments = EnrollmentSerializer(source='enrollment_set', many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'code', 'description', 'instructor', 'cover_image', 
                 'created_at', 'updated_at', 'is_published', 'modules', 'enrollments']
        read_only_fields = ['id', 'created_at', 'updated_at']

class CourseCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a new course
    """
    class Meta:
        model = Course
        fields = ['title', 'code', 'description', 'instructor', 'cover_image', 'is_published']
