# Generated by Django 5.1.2 on 2024-10-31 05:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_download_financialreporttype_notice_popup_product_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ProductType',
            new_name='ProductDetails',
        ),
    ]
