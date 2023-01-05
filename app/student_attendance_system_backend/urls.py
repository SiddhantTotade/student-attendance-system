from .models import *
from django.urls import path
from .views import *

urlpatterns = [
    path('students/',StudentsAPI.as_view()),
    path('attendance/',AttendanceAPI.as_view()),
    path('filter-attendance/',get_attendance_of_each)
]