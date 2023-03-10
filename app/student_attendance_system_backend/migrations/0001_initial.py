# Generated by Django 4.1.5 on 2023-01-05 05:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('student_name', models.CharField(blank=True, max_length=40, null=True)),
                ('student_id', models.CharField(blank=True, max_length=15, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attendance_date', models.DateField()),
                ('time_checkin', models.TimeField()),
                ('time_checkout', models.TimeField()),
                ('attendance_of_student', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='student_attendance_system_backend.student')),
            ],
        ),
    ]
