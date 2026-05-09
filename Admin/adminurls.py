from Admin import views
from django.contrib import admin
from django.urls import path
app_name='Admin'

urlpatterns = [
   path('',views.adminhome,name='adminhome'),
   path('logout/',views.logout,name='logout'),
   path('registration/',views.registration,name='registration'),
   path('adminrequest/',views.adminrequest,name='adminrequest'),
   path('admin_management/',views.admin_management,name='admin_management'),
   path('user_management/',views.user_management,name='user_management'),
   path('customer_management/',views.customer_management,name='customer_management'),
   path('message/',views.message,name='message'),
   path('request_by_chatbot/',views.request_by_chatbot,name='request_by_chatbot'),
   path('chatbot/',views.chatbot,name='chatbot'),
   path('admin_profile/',views.admin_profile,name='admin_profile'),
   path('delete_user/<str:username>/<str:role>/', views.delete_user, name='delete_user'),
]