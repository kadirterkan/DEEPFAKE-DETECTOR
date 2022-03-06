from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def detect_image(request):
    return HttpResponse("THIS IS A TEST")


def detect_video(request):
    return HttpResponse("THIS IS A TEST")


def test(request):
    return HttpResponse("THIS IS A TEST")
