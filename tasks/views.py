# tasks/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
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
    filterset_fields = ['is_completed', 'status']
    search_fields = ['title', 'description']
    ordering_fields = ['deadline', 'created_at']

    def get_queryset(self):
      user = self.request.user
      queryset = Task.objects.filter(user=user).order_by('-created_at')

      # Handle status filter from query params
      status = self.request.query_params.get('status')
      if status in ['upcoming', 'missed', 'completed']:
            queryset = [task for task in queryset if task.status == status]

      return queryset


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def mark_complete(self, request, pk=None):
        task = self.get_object()
        task.completed = True
        task.save()
        return Response(TaskSerializer(task).data)
