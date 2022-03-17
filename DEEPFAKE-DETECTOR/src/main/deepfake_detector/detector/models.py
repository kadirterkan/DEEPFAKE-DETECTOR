from django.db import models
import cv2
from model.detector import Detector

detector = Detector()

# Create your models here.
def detect_image(image):
    return detector.detect_image(image)

def detect_video(video):
    return
