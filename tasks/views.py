# tasks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from django.db.models import Q
# from rest_framework.authentication import TokenAuthentication

from .models import Task
from .serializers import TaskSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['deadline', 'created_at']

    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.filter(user=user).order_by('-created_at')

        # Handle status filter from query params using proper ORM
        status_filter = self.request.query_params.get('status')
        if status_filter == 'upcoming':
            queryset = queryset.filter(completed=False, deadline__gt=timezone.now())
        elif status_filter == 'missed':
            queryset = queryset.filter(completed=False, deadline__lt=timezone.now())
        elif status_filter == 'completed':
            queryset = queryset.filter(completed=True, deadline__gte=timezone.now())
        elif status_filter == 'completed_late':
            queryset = queryset.filter(completed=True, deadline__lt=timezone.now())

        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        task = self.get_object()
        task.completed = True
        task.save()
        return Response(TaskSerializer(task).data)

    @action(detail=False, methods=['get'])
    def bucket_counts(self, request):
        """Get counts of tasks in each bucket for the authenticated user"""
        user = request.user
        now = timezone.now()
        
        upcoming_count = Task.objects.filter(
            user=user, 
            completed=False, 
            deadline__gt=now
        ).count()
        
        missed_count = Task.objects.filter(
            user=user, 
            completed=False, 
            deadline__lt=now
        ).count()
        
        completed_count = Task.objects.filter(
            user=user, 
            completed=True,
            deadline__gte=now
        ).count()

        completed_late_count = Task.objects.filter(
            user=user, 
            completed=True,
            deadline__lt=now
        ).count()
        
        return Response({
            'upcoming': upcoming_count,
            'missed': missed_count,
            'completed': completed_count,
            'completed_late': completed_late_count,
            'total': upcoming_count + missed_count + completed_count + completed_late_count
        })

    @action(detail=False, methods=['get'])
    def auto_bucket_summary(self, request):
        """Get a summary of tasks automatically bucketed by status"""
        user = request.user
        now = timezone.now()
        
        # Get tasks for each bucket
        upcoming_tasks = Task.objects.filter(
            user=user, 
            completed=False, 
            deadline__gt=now
        ).order_by('deadline')
        
        missed_tasks = Task.objects.filter(
            user=user, 
            completed=False, 
            deadline__lt=now
        ).order_by('-deadline')
        
        completed_tasks = Task.objects.filter(
            user=user, 
            completed=True,
            deadline__gte=now
        ).order_by('-updated_at')

        completed_late_tasks = Task.objects.filter(
            user=user, 
            completed=True,
            deadline__lt=now
        ).order_by('-updated_at')
        
        return Response({
            'upcoming': TaskSerializer(upcoming_tasks, many=True).data,
            'missed': TaskSerializer(missed_tasks, many=True).data,
            'completed': TaskSerializer(completed_tasks, many=True).data,
            'completed_late': TaskSerializer(completed_late_tasks, many=True).data,
            'summary': {
                'upcoming_count': upcoming_tasks.count(),
                'missed_count': missed_tasks.count(),
                'completed_count': completed_tasks.count(),
                'completed_late_count': completed_late_tasks.count(),
                'total_count': upcoming_tasks.count() + missed_tasks.count() + completed_tasks.count() + completed_late_tasks.count()
            }
        })
