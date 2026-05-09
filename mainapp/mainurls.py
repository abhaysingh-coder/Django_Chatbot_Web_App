from mainapp import views
from django.contrib import admin
from django.urls import path
app_name='mainapp'

urlpatterns = [
   path('',views.Loginhome,name='Loginhome'),
   path('forget/',views.forgethome,name='forgethome'),
   path('signup/',views.signuphome,name='signuphome'),
]