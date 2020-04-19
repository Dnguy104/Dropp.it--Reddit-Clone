from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.shortcuts import render

# Create your views here.

def Main(request):
    return render(request, 'home.html')

def hello(request):
    data = "Hello World"
    return HttpResponse(data)