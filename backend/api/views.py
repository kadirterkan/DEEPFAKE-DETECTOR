import json
from tempfile import NamedTemporaryFile
from base.models import detect_by_video
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from django.http import HttpResponse

@api_view(['POST'])
@parser_classes([MultiPartParser]) 
def get_result_from_video(request):
    tmp = NamedTemporaryFile(suffix=".mp4")
    for test in request.data.values():
        tmp.write(test.read())
    result = detect_by_video(tmp.name)
    return HttpResponse(json.dumps(result))