from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Course, Enrollment, Module, Content
from .serializers import (
    CourseSerializer, CourseDetailSerializer, CourseCreateSerializer,
    ModuleSerializer, ContentSerializer, EnrollmentSerializer
)

class IsInstructorOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow instructors to edit courses
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the instructor
        return obj.instructor == request.user

class CourseViewSet(viewsets.ModelViewSet):
    """
    API endpoint for courses
    """
    queryset = Course.objects.all()

    def get_serializer_class(self):
        if self.action == 'create':
            return CourseCreateSerializer
        elif self.action in ['retrieve', 'update', 'partial_update']:
            return CourseDetailSerializer
        return CourseSerializer

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            permission_classes = [IsInstructorOrReadOnly]
        elif self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    @action(detail=True, methods=['post'])
    def enroll(self, request, pk=None):
        """
        Enroll the current user in the course
        """
        course = self.get_object()
        user = request.user

        # Check if the user is already enrolled
        if Enrollment.objects.filter(student=user, course=course).exists():
            return Response({'detail': 'You are already enrolled in this course.'},
                           status=status.HTTP_400_BAD_REQUEST)

        # Create enrollment
        enrollment = Enrollment.objects.create(student=user, course=course)
        serializer = EnrollmentSerializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def modules(self, request, pk=None):
        """
        Get all modules for a course
        """
        course = self.get_object()
        modules = course.modules.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)

class ModuleViewSet(viewsets.ModelViewSet):
    """
    API endpoint for modules
    """
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if 'course_pk' in self.kwargs:
            return Module.objects.filter(course_id=self.kwargs['course_pk'])
        return Module.objects.all()

    def perform_create(self, serializer):
        if 'course_pk' in self.kwargs:
            course = get_object_or_404(Course, pk=self.kwargs['course_pk'])
            serializer.save(course=course)
        else:
            serializer.save()

class ContentViewSet(viewsets.ModelViewSet):
    """
    API endpoint for content
    """
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if 'module_pk' in self.kwargs:
            return Content.objects.filter(module_id=self.kwargs['module_pk'])
        return Content.objects.all()

    def perform_create(self, serializer):
        if 'module_pk' in self.kwargs:
            module = get_object_or_404(Module, pk=self.kwargs['module_pk'])
            serializer.save(module=module)
        else:
            serializer.save()
