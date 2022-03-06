from django.urls import path
from . import views

urlpatterns = [
    path('test', views.test()),
    path('detectImage', views.detect_image()),
    path('detectVideo', views.detect_video())
]
