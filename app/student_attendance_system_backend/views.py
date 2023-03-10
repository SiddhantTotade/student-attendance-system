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
        stu_id = list(request.data.values())[2]
        all_students = Student.objects.filter(student_id=stu_id).exists()
        student_data = StudentSerializer(data=request.data)

        if all_students:
            return JsonResponse("Student id already exist",safe=False)
        
        if student_data.is_valid():
            student_data.save()
            return JsonResponse("Student created successfully",safe=False)
        return JsonResponse("Failed to create student",safe=False)

class AttendanceAPI(APIView):
    def get(self,request):
        attendance_data = Attendance.objects.all()

        
        if attendance_data:
            attendance_serializer = AttendanceSerialzier(attendance_data,many=True)
            return JsonResponse(attendance_serializer.data,safe=False)
        return JsonResponse("No attendance found",safe=False)

    def post(self,request):
        attendance_data = AttendanceSerialzier(data=request.data)
        
        if attendance_data.is_valid():
            attendance_data.save()
            return JsonResponse("Attendance marked successfully",safe=False)
        return JsonResponse("Failed to mark attendance",safe=False)

def get_attendance_of_each(request):
    student_list=[]
    student_data = Student.objects.all()

    for data in student_data:
        attendance_count = Attendance.objects.filter(attendance_of_student=data,present_or_absent=True).count()
        student_list.append(attendance_count)

    return JsonResponse(student_list,safe=False)