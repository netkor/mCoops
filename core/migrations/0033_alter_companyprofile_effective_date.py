# Generated by Django 5.1.2 on 2024-12-07 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0032_companyprofile_childcustomers_companyprofile_funds_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='effective_date',
            field=models.DateField(),
        ),
    ]