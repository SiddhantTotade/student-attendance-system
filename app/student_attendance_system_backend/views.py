from rest_framework.views import APIView
from .models import *
from .serializers import *
from django.http import JsonResponse

# Create your views here.
class StudentsAPI(APIView):
    def get(self, request):
        all_students = Student.objects.all()

        if all_students:
            student_serializer = StudentSerializer(all_students,many=True)
            return JsonResponse(student_serializer.data,safe=False)
        return JsonResponse("No Students Found",safe=False)

    def post(self,request):
        student_data = StudentSerializer(data=request.data)
        
        if student_data.is_valid():
            student_data.save()
            return JsonResponse("Student added successfully",safe=False)
        return JsonResponse("Failed to add student",safe=False)

class AttendanceAPI(APIView):
    def get(self,request):
        attendance_data = Attendance.objects.all()

        if attendance_data:
            attendance_serializer = AttendanceSerialzier(attendance_data,many=True)
            return JsonResponse(attendance_serializer.data,safe=False)
        return JsonResponse("No attendance found",safe=False)

    def post(self,request):
        attendance_data = AttendanceSerialzier(data=request.data)
        print(attendance_data)
        
        if attendance_data.is_valid():
            attendance_data.save()
            return JsonResponse("Attendance marked successfully",safe=False)
        return JsonResponse("Failed to mark attendance",safe=False)
