# Generated by Django 5.1.2 on 2024-11-22 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0018_popup_display_order_popup_display_title_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='description',
            field=models.TextField(blank=True, default='description', max_length=5000),
        ),
        migrations.AlterField(
            model_name='photo',
            name='location',
            field=models.CharField(blank=True, default='location', help_text='Enter the specific location where the photo was taken.', max_length=255),
        ),
    ]