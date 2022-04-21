from base.models import detect_by_video
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from .serializers import VideoSerializer
import os

media_url = r'/app/backend/media/video/'

@api_view(['POST'])
@parser_classes([MultiPartParser]) 
def get_result_from_video(request):
    serializer = VideoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        file = serializer.validated_data
        destination = str(media_url + file['video'].name)
        result = detect_by_video(destination)
        os.remove(str(media_url + file['video'].name))
    return Response(result)