from User import views
from django.contrib import admin
from django.urls import path
app_name='User'

urlpatterns = [
   path('',views.userhome,name='userhome'),
   path('customer_management/',views.customer_management,name='customer_management'),
   path('messages/',views.messages,name='messages'),
   path('request_by_chatbot/',views.request_by_chatbot,name='request_by_chatbot'),
   path('userbot/',views.userbot,name='userbot'),
   path('user_profile/',views.user_profile,name='user_profile'),
   path('delete_data/<str:username>/<str:role>/',views.delete_data,name='delete_data'),
]