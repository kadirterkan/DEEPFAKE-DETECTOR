from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Video
from .serializers import VideoSerializer

@api_view(['POST'])
def get_result_from_image(request):
    video = Video.objects.all()
    serializers = VideoSerializer(video, many=True)
    return Response(video)