from django.shortcuts import render,redirect
from django.utils import timezone
from django.views.decorators.cache import cache_control
from django.core.exceptions import ObjectDoesNotExist
from .models import *
from Admin.models import *
from django.contrib import messages
from django.core.mail import send_mail
from django.contrib import messages

# Create your views here.
@cache_control(no_store=True, no_cache=True, must_revalidate=True)
def Loginhome(request):
    if request.method == 'POST':
        role = request.POST.get('role')
        email = request.POST.get('email')
        password = request.POST.get('password')
        try:
            if role == 'admin':
                user = AdminRegistration.objects.get(email=email, password=password)
                request.session['admin_email'] = user.email
                request.session['email'] = user.email
                request.session['role'] = role
                return redirect('Admin:adminhome')
            elif role == 'customer':
                user = Customer.objects.get(email=email, password=password)
                request.session['customer_email'] = user.email
                request.session['email'] = user.email
                request.session['role'] = role
                return redirect('Customer:customerhome')
            elif role == 'user':
                user = UserRegistration.objects.get(email=email, password=password)
                request.session['user_email'] = user.email
                request.session['email'] = user.email
                request.session['role'] = role
                return redirect('User:userhome')
            else:
                return render(request, 'login.html', {'message': 'Invalid User Type selected'})
        except ObjectDoesNotExist:
            return render(request, 'login.html', {'message': 'Invalid email or password'})
    return render(request, 'login.html')

def forgethome(request):
    if request.method == 'POST':
        email = request.POST.get('email').strip()
        role = request.POST.get('role')
        password = request.POST.get('password')
        if role == 'user':
            database = UserRegistration
        elif role == 'customer':
            database = Customer
        elif role == 'admin':
            database = AdminRegistration
        try:
            user = database.objects.filter(email=email).first()
            user.password = password
            user.save()
            return redirect('mainapp:Loginhome')
        except ObjectDoesNotExist:
            return render(request, 'forget.html', {'message': 'Email not found'})
    return render(request,'forget.html')

def signuphome(request):
    if request.method == 'POST':
        role = request.POST.get('role')
        username = request.POST.get('username').strip()
        name = request.POST.get('first_name').strip() + ' ' + request.POST.get('last_name').strip()
        email = request.POST.get('email').strip()
        phone_number = request.POST.get('phone_number').strip()
        password = request.POST.get('password')
        if role == 'user':
            database = UserRequest
        elif role == 'customer':
            database = Customer
        elif role == 'admin':
            database = AdminRequest

        if database.objects.filter(username=username).exists():
            return render(request, 'signup.html', {'message': 'Username already exists'})
        elif database.objects.filter(email=email).exists():
            return render(request, 'signup.html', {'message': 'Email already exists'})
        else:
            user = database(username=username, Name=name, email=email, phone_number=phone_number, password=password)
            user.save()
            return redirect('mainapp:Loginhome')
    return render(request,'signup.html')