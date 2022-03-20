from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FileUploadParser, MultiPartParser
from base.models import Video
from .serializers import VideoSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser]) 
def get_result_from_video(request):
    serializer = VideoSerializer(data=request.data)
    print(serializer.is_valid())
    print(serializer.errors)
    if serializer.is_valid():
        file = serializer.validated_data
        print(file)
        serializer.save()
    return Response()