# Generated by Django 4.2.8 on 2024-09-09 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_customuser_first_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='firebase_uid',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
