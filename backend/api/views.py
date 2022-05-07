import json
from tempfile import NamedTemporaryFile
from base.models import detect_by_video, get_video_by_id
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from django.http import HttpResponse, FileResponse

@api_view(['POST'])
@parser_classes([MultiPartParser]) 
def get_result_from_video(request):
    tmp = NamedTemporaryFile(suffix=".mp4")
    for test in request.data.values():
        tmp.write(test.read())
    #video.delete()
    result = detect_by_video(tmp.name)
    return HttpResponse(json.dumps(result))

@api_view(['POST'])
def get_video(request):
    file = open("/app/media/video/213.webm", 'rb')
    #video_id = request.data['key']
    #video = get_video_by_id(video_id)
    #file = FileWrapper(video.get_video()._get_file().name)
    #test = video.get_video()._get_file()
    #test.open('r')
    #bla = test.read()

    return FileResponse(file);