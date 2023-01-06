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
        print(attendance_data)
        
        if attendance_data.is_valid():
            attendance_data.save()
            return JsonResponse("Attendance marked successfully",safe=False)
        return JsonResponse("Failed to mark attendance",safe=False)

def get_attendance_of_each(request):
    student_list=[]
    student_count_dict={}
    attendance = Attendance.objects.all()

    for att in attendance:
        if att.present_or_absent == True:
            student_list.append(att.attendance_of_student)

    for stu in student_list:
        student_count_dict[stu] = student_list.count(stu)

    return JsonResponse(list(student_count_dict.values()),safe=False)