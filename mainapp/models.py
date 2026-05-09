from django.db import models

# Create your models here.

class AdminRegistration(models.Model):
    username = models.CharField(max_length=100)
    Name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=10)
    password = models.CharField(max_length=100)
    def __str__(self):
        return self.username

class AdminRequest(models.Model):
    username = models.CharField(max_length=100)
    Name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=10)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class SuperAdmin(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username