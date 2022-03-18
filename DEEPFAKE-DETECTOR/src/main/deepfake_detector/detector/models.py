from django.db import models
import cv2

class Video(models.Model):
    caption = models.CharField(max_length = 100)
    video = models.FileField(upload_to="video/%y")

    def __str__(self):
        return self.caption

def detect_video(video):
    return
