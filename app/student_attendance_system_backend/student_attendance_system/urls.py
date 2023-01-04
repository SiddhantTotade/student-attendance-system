from .views import *
from django.urls import path

urlpatterns = [
    path("student/",Student.as_view())
]