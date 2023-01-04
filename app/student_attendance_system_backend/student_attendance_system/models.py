from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Students(models.Model):
    student_name = models.CharField(max_length=50,null=True,blank=True)
    student_id = models.CharField(max_length=15,null=True,blank=True)

    def __str__(self):
        return self.student_name

class Attendance(models.Model):
    student = models.ForeignKey(Students,default=None,on_delete=models.CASCADE)
    time_checkin = models.TimeField(auto_now=False,auto_now_add=False)
    time_checkout = models.TimeField(auto_now=False,auto_now_add=False)