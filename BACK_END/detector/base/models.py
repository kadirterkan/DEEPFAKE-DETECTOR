from django.db import models
from model_detector import detector_model

# Create your models here.
class Video(models.Model):
    video = models.FileField(upload_to='video/')

def detect_by_video(destination):
    return detector_model.detector(destination)

