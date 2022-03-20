from django.urls import path, include
from . import views

urlpatterns = [
    path('detector', views.get_result_from_image)
]