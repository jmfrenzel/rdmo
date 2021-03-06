# Generated by Django 2.2.2 on 2019-07-12 09:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0027_project_site'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='site',
            field=models.ForeignKey(help_text='The site this project belongs to (in a multi site setup).', on_delete=django.db.models.deletion.CASCADE, to='sites.Site', verbose_name='Site'),
        ),
    ]
