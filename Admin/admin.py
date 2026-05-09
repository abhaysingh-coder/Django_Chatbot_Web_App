from django.contrib import admin
from .models import *
from Customer.models import *
from mainapp.models import *

# Register your models here.

admin.site.register(AdminRegistration)
admin.site.register(AdminRequest)
admin.site.register(Customer)
admin.site.register(UserRegistration)
admin.site.register(UserRequest)
admin.site.register(ChatHistory)
admin.site.register(ChatMessage)