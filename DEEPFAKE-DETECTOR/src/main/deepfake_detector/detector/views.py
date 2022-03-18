from django.shortcuts import render
from django.http import HttpResponse
from .models import Video

# Create your views here.

def detect_video(request):
    video = Video.objects.all()
    return HttpResponse("Test")


def test(request):
    return HttpResponse("THIS IS A TEST")
