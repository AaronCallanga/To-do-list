from django.db import models

# Create your models here.

class Task(models.Model):
    date = models.DateField(auto_now_add=True)
    description = models.TextField()

    def __str__(self):
        return self.description



