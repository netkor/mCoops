# Generated by Django 5.1.2 on 2024-11-23 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_alter_photo_description_alter_photo_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='download',
            name='cover',
            field=models.ImageField(null=True, upload_to='downloads/'),
        ),
    ]
