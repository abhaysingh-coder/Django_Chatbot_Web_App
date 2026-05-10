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
    return render(request,'admin_home.html')

def logout(request):
    request.session.flush()
    return redirect('mainapp:Loginhome')

def registration(request):
    user = UserRequest.objects.all()
    role = 'user'
    return render(request,'admin_registration.html',{'user': user, 'role': role})

def adminrequest(request):
    user = AdminRequest.objects.all()
    role = 'admin'
    return render(request,'admin_RequestbyAdmin.html',{'user': user, 'role': role})

def admin_management(request):
    customer = AdminRegistration.objects.all()
    role = 'admin'
    return render(request,'admin_management.html', {'customer': customer,'role': role})

def user_management(request):
    customer = UserRegistration.objects.all()
    role = 'user'
    return render(request,'admin_user_management.html', {'customer': customer,'role': role})

def customer_management(request):
    customer = Customer.objects.all()
    role = 'customer'
    return render(request,'admin_customer_management.html', {'customer': customer,'role': role})

def message(request):
    messages = ChatHistory.objects.filter(Role__in=['customer', 'user'])
    return render(request, 'admin_message.html', {'messages': messages})

def request_by_chatbot(request):
    messages = ChatMessage.objects.filter(Role__in=['customer', 'user'])
    return render(request,'admin_requestbychatbot.html', {'messages': messages})

def chatbot(request):
    messages = chatbot_response(request)
    return render(request,'admin_chatbot.html', {"messages": messages})

def admin_profile(request):
    email = request.session.get('admin_email')
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


