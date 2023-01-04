from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.http import JsonResponse

# Create your views here.
class Student(APIView):
    def get(self,request):
        all_students = Attendance.objects.all()

        if all_students:
            all_student_serializer_data = StudentSerializer(all_students,many=True)
            return JsonResponse(all_student_serializer_data.data,safe=False)
        return JsonResponse("No Student Data",safe=False)