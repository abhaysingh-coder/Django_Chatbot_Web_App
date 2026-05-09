from django.shortcuts import render
from chatbot import *
from .models import *
from wordfreq import zipf_frequency
from Admin.models import *

# Create your views here.
def customerhome(request):
    email = request.session.get('email')
    customer = Customer.objects.filter(email=email).first()
    return render(request,'customer_home.html', {"customer": customer})

def customerbot(request):
    messages = chatbot_response(request)
    return render(request,'customer_chatbot.html', {"messages": messages})

def customerprofile(request):
    email = request.session.get('email')
    user = Customer.objects.filter(email=email).first()
    return render(request,'customer_profile.html', {"user": user})

def is_random(text):
    words = text.split()
    valid = 0
    for word in words:
        if zipf_frequency(word, 'en') > 2:
            valid += 1
    return valid == 0

def chatbot_response(request):
    role = request.session.get('role', 'user')
    email = request.session.get('email', '')
    if "messages" not in request.session:
        request.session["messages"] = []
    messages = request.session["messages"]
    if request.method == "POST":
        user_message = request.POST.get("message", "").strip()
        if user_message:
            messages = messages + [{"sender": "user", "text": user_message}]
            msg = user_message.lower()
            if "hello" in msg or "hi" in msg:
                reply = "Hello! How can I help you?"
            elif "how are you" in msg:
                reply = "I'm doing great 😄"
            elif "bye" in msg:
                reply = "Goodbye! Have a nice day!"
            elif is_random(msg):
                reply = "Sorry, I didn't understand that. Can you please rephrase?"
            else:
                reply = prediction(msg, 'Intent')
                ChatMessage.objects.create(Role=role, Email=email, Flags=prediction(msg, 'Flags'), Utterance=user_message, Category=prediction(msg, 'Category'), Intent=reply)
            messages = messages + [{"sender": "bot", "text": reply}]
            ChatHistory.objects.create(Role = role, Email=email, user_message=user_message, bot_response=reply)
        request.session["messages"] = messages
        request.session.modified = True
    return messages
