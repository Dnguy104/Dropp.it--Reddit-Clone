# Generated by Django 3.0.5 on 2020-07-21 22:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DropBag', '0006_auto_20200721_1455'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created_on',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
