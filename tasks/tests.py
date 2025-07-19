# tasks/tests.py

from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework.authtoken.models import Token
from .models import Task
from datetime import timedelta

User = get_user_model()

class TaskAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')
        self.token = Token.objects.create(user=self.user)
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        now = timezone.now()
        # 3 tasks: upcoming, missed, completed
        self.upcoming_task = Task.objects.create(
            user=self.user,
            title='Upcoming Task',
            deadline=now + timedelta(days=1),
        )
        self.missed_task = Task.objects.create(
            user=self.user,
            title='Missed Task',
            deadline=now - timedelta(days=1),
        )
        self.completed_task = Task.objects.create(
            user=self.user,
            title='Completed Task',
            deadline=now + timedelta(days=1),
            completed=True
        )

    def test_task_creation(self):
        data = {
            "title": "New Task",
            "deadline": (timezone.now() + timedelta(days=2)).isoformat()
        }
        response = self.client.post('/api/tasks/', data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['title'], 'New Task')

    def test_upcoming_task_filter(self):
        response = self.client.get('/api/tasks/?status=upcoming')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Upcoming Task')

    def test_missed_task_filter(self):
        response = self.client.get('/api/tasks/?status=missed')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Missed Task')

    def test_completed_task_filter(self):
        response = self.client.get('/api/tasks/?status=completed')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Completed Task')

    def test_mark_task_as_completed(self):
        response = self.client.post(f'/api/tasks/{self.upcoming_task.id}/mark_complete/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data['completed'])
        self.assertEqual(response.data['status'], 'completed')
