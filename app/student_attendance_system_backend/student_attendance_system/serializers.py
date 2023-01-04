from .models import *
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        students = Student.objects.create(student_name = validated_data['student_name'],student_id = validated_data['student_id'])
        students.save()
        return students

class AttendanceSerializer(serializers.Serializer):
    class Meta:
        model = Attendance
        fields = '__all__'

    def create(self, validated_data):
        attendance = Attendance.objects.create(student = validated_data['student'],time_checkin = validated_data['time_checkin'],time_checkout = validated_data['time_checkout'])
        return attendance