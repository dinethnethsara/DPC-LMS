from django.contrib import admin
from .models import Quiz, Question, Choice, Assignment, Submission, QuizAttempt, QuizResponse

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionInline(admin.StackedInline):
    model = Question
    extra = 1

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'module', 'time_limit_minutes', 'passing_score', 'is_published')
    list_filter = ('is_published', 'created_at')
    search_fields = ('title', 'description')
    inlines = [QuestionInline]

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'quiz', 'question_type', 'points', 'order')
    list_filter = ('question_type', 'quiz')
    search_fields = ('question_text',)
    inlines = [ChoiceInline]

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'module', 'due_date', 'total_points', 'is_published')
    list_filter = ('is_published', 'due_date')
    search_fields = ('title', 'description')
    date_hierarchy = 'due_date'

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('student', 'assignment', 'submitted_at', 'score', 'graded_by')
    list_filter = ('submitted_at', 'graded_at')
    search_fields = ('student__username', 'assignment__title', 'feedback')
    readonly_fields = ('submitted_at',)

@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('student', 'quiz', 'score', 'started_at', 'completed_at', 'is_completed')
    list_filter = ('is_completed', 'started_at')
    search_fields = ('student__username', 'quiz__title')
    readonly_fields = ('started_at',)

@admin.register(QuizResponse)
class QuizResponseAdmin(admin.ModelAdmin):
    list_display = ('attempt', 'question', 'is_correct', 'points_earned')
    list_filter = ('is_correct',)
    search_fields = ('text_response', 'question__question_text')
