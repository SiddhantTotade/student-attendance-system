from django.db import models

# Create your models here.

class Student(models.Model):
    student_name= models.Model(max_length = 40,null=True,blank=True)
    student_id= models.Model(max_length = 40,null=True,blank=True)

    def __str__(self):
        return self.student_name

class Attendance(models.Model):
    attendance_of_student = models.ForeignKey(Student,null=True,on_delete=models.CASCADE)
    attendance_date = models.DateField()
    time_checkin = models.TimeField()
    time_checkout = models.TimeField()