# Generated by Django 5.1.2 on 2024-11-15 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_setting_is_headoffice_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='setting',
            name='goal',
            field=models.TextField(default='Default Goal', null=True),
        ),
        migrations.AddField(
            model_name='setting',
            name='objective',
            field=models.TextField(default='Default Objective', null=True),
        ),
    ]