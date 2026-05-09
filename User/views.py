from django.shortcuts import redirect, render
from Customer.views import chatbot_response
from Admin.models import *
from Customer.models import *
from mainapp.models import *
import decorators

# Create your views here.
@decorators.login_required_role('admin')
def userhome(request):
    email = request.session.get('email')
    user = UserRegistration.objects.filter(email=email).first()
    return render(request,'user_home.html', {'user': user})

def customer_management(request):
    customer = Customer.objects.all()
    role = request.session.get('role')
    return render(request,'user_customer_management.html', {'customer': customer,'role': role})

def messages(request):
    messages = ChatHistory.objects.filter(Role='customer')
    return render(request,'user_messages.html', {'messages': messages})

def request_by_chatbot(request):
    messages = ChatMessage.objects.filter(Role='customer')
    return render(request,'user_request_by_chatbot.html', {'messages': messages})

def userbot(request):
    messages = chatbot_response(request)
    return render(request,'user_chatbot.html', {"messages": messages})

def user_profile(request):
    email = request.session.get('email')
    user = UserRegistration.objects.filter(email=email).first()
    return render(request,'user-profile.html', {'user': user})

def delete_data(request, username, role):
    print(username)
    print(role)
    if role == 'admin':
        database = AdminRegistration
        redirect_url = 'Admin:admin_management'
    elif role == 'user':
        database = UserRegistration
        redirect_url = 'Admin:user_management'
    elif role == 'customer':
        database = Customer
        redirect_url = 'Admin:customer_management'
    user = database.objects.filter(username=username).first()
    print(user)
    if user:
        user.delete()
        print("deleted")
    return redirect(redirect_url)
