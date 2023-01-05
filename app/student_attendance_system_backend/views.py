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