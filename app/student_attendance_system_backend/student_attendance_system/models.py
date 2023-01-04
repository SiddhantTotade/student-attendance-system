from django.db import models

# Create your models here.
class Students(models.Model):
    student_name = models.CharField(max_length=50,null=True,blank=True)
    student_id = models.CharField(max_length=15,null=True,blank=True)

class Attendance(models.Model):
    time_checkin = models.TimeField()
    time_checkout = models.TimeField()
