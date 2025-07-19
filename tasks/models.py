from django.db import models
from django.conf import settings
from django.utils import timezone

class Task(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('missed', 'Missed'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    deadline = models.DateTimeField()
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def status(self):
        if self.completed:
            return 'completed'
        elif timezone.now() > self.deadline:
            return 'missed'
        else:
            return 'upcoming'

    def __str__(self):
        return self.title
