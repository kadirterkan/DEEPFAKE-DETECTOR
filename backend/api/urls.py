from django.urls import path
from . import views

urlpatterns = [
    path('detector', views.get_result_from_video),
    path('video', views.get_video),
]