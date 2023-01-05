from .models import *
from rest_framework import serializers

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

    def create(self, validated_data):
        student = Student.objects.create(student_name = validated_data['student_name'],student_id = validated_data['student_id'])
        student.save()
        return student

class AttendanceSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

    def create(self, validated_data):
        attendance = Attendance.objects.create(attendance_of_student = validated_data['attendance_of_student'],attendance_date = validated_data['attendance_date'],time_checkin = validated_data['time_checkin'],time_checkout = validated_data['time_checkout'],present_or_absent = validated_data['present_or_absent'])
        attendance.save()
        return attendance