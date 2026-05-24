from django.shortcuts import redirect, render

from Customer.views import chatbot_response
from .models import *
from mainapp.models import *
from User.models import *
from Customer.models import *
import decorators


# Create your views here.
@decorators.login_required_role('admin')
def adminhome(request):
    email = request.session.get('email')
    context = {
        'email' : email,
        'user' : AdminRegistration.objects.filter(email=email).first(),
        'total_admins': AdminRegistration.objects.count(),
        'total_users' : UserRegistration.objects.count(),
        'customers' : Customer.objects.count(),
        'messages': ChatHistory.objects.count()
    }
    return render(request,'admin_home.html', context)

def logout(request):
    request.session.flush()
    return redirect('mainapp:Loginhome')

def registration(request):
    context = {
        'user' : UserRequest.objects.all(),
        'role' : 'user'
    }
    return render(request,'admin_registration.html', context)

def adminrequest(request):
    context = {
        'user' : AdminRequest.objects.all(),
        'role' : 'admin'
    }
    return render(request,'admin_RequestbyAdmin.html', context)

def admin_management(request):
    context = {
        'customer' : AdminRegistration.objects.all(),
        'role' : 'admin'
    }
    return render(request,'admin_management.html', context)

def user_management(request):
    context = {
        'customer' : UserRegistration.objects.all(),
        'role' : 'user'
    }
    return render(request,'admin_user_management.html', context)

def customer_management(request):
    context = {
        'customer' : Customer.objects.all(),
        'role' : 'customer'
    }
    return render(request,'admin_customer_management.html', context)

def message(request):
    context = {
        'messages' : ChatHistory.objects.filter(Role__in=['customer', 'user']),
    }
    return render(request, 'admin_message.html', context)

def request_by_chatbot(request):
    context = {
        'messages' : ChatMessage.objects.filter(Role__in=['customer', 'user']),
    }
    return render(request,'admin_requestbychatbot.html', context)

def chatbot(request):
    messages = chatbot_response(request)
    return render(request,'admin_chatbot.html', {"messages": messages})

def admin_profile(request):
    email = request.session.get('email')
    user = AdminRegistration.objects.filter(email=email).first()
    return render(request,'admin_profile.html', {'user': user})

def delete_user(request, username, role):
    if role == 'admin':
        request_database = AdminRequest
        database = AdminRegistration
        redirect_url = 'Admin:adminrequest'
    else:
        request_database = UserRequest
        database = UserRegistration
        redirect_url = 'Admin:registration'
    user = request_database.objects.filter(username=username).first()
    if user:
        database.objects.create(username=user.username, Name=user.Name, email=user.email, phone_number=user.phone_number, password=user.password)
        user.delete()
    return redirect(redirect_url)


