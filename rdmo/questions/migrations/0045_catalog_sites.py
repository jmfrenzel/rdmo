# Generated by Django 2.2.2 on 2019-06-17 11:10

import django.contrib.sites.managers
from django.db import migrations, models
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0002_alter_domain_unique'),
        ('questions', '0044_require_uri_prefix'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='catalog',
            managers=[
                ('objects', django.db.models.manager.Manager()),
                ('on_site', django.contrib.sites.managers.CurrentSiteManager()),
            ],
        ),
        migrations.AddField(
            model_name='catalog',
            name='sites',
            field=models.ManyToManyField(help_text='The sites this catalog belongs to (in a multi site setup).', to='sites.Site', verbose_name='Sites'),
        ),
    ]
