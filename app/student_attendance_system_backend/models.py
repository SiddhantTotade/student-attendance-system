from django.db import models
from datetime import datetime

# Create your models here.

class Student(models.Model):
    student_name= models.CharField(max_length=40,null=True,blank=True)
    student_id= models.CharField(max_length=15,null=True,blank=True)

    def __str__(self):
        return self.student_id

class Attendance(models.Model):
    attendance_of_student = models.ForeignKey(Student,null=True,on_delete=models.CASCADE)
    attendance_date = models.DateField()
    time_checkin = models.TimeField(default=datetime.now().strftime("%H:%M"))
    time_checkout = models.TimeField(default=datetime.now().strftime("%H:%M"))
    present_or_absent = models.BooleanField(default=False)