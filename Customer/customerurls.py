from Customer import views
from django.contrib import admin
from django.urls import path
app_name='Customer'

urlpatterns = [
   path('',views.customerhome,name='customerhome'),
   path('customerbot/',views.customerbot,name='customerbot'),
   path('customerprofile/',views.customerprofile,name='customerprofile'),
]