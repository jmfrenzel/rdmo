# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-08-01 11:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conditions', '0002_many_to_many_for_conditions'),
    ]

    operations = [
        migrations.AlterField(
            model_name='condition',
            name='relation',
            field=models.CharField(choices=[('eq', 'is equal to (==)'), ('neq', 'is not equal to (!=)'), ('contains', 'contains'), ('gt', 'is greater than (>)'), ('gte', 'is greater than or equal (>=)'), ('lt', 'is lesser than (<)'), ('lte', 'is lesser than or equal (<=)')], max_length=8),
        ),
    ]
