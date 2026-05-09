from django.db import models

# Create your models here.
class ChatMessage(models.Model):
    Role = models.CharField(max_length=20)
    Email = models.CharField(max_length=100)
    Flags = models.CharField(max_length=10)
    Utterance = models.TextField()
    Category = models.CharField(max_length=10)
    Intent = models.CharField(max_length=10)
    def __str__(self):
        return self.Email

class ChatHistory(models.Model):
    Role = models.CharField(max_length=20)
    Email = models.CharField(max_length=100)
    user_message = models.TextField()
    bot_response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} - {self.timestamp}"