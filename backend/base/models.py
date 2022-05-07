from django.db import models
from model_detector import detector_model
from django.core import files
from django.db.models import Max
from django.shortcuts import get_object_or_404


# Create your models here.
class Video(models.Model):
    id = models.AutoField(primary_key=True)
    video = models.FileField(upload_to='video/')

    def get_id(self):
        return self.id
    
    def get_video(self):
        return self.video

def detect_by_video(destination):
    result, video = detector_model.detector(destination)
    next_id = Video.objects.aggregate(Max("id"))['id__max']
    temp_file = files.File(video, str(next_id + 1) + ".webm")
    video_model = Video.objects.create(video = temp_file)
    video_model.save()
    result['video_id'] = video_model.get_id()
    return result

def get_video_by_id(video_id):
    return get_object_or_404(Video, id = video_id)