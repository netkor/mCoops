# Generated by Django 5.1.2 on 2024-11-16 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_team_order_by_team_type_order_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='productdetails',
            name='banner',
            field=models.ImageField(default=1, upload_to='products/'),
            preserve_default=False,
        ),
    ]
