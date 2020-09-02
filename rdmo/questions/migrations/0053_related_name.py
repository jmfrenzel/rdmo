# Generated by Django 2.2.13 on 2020-08-24 11:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0052_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='attribute',
            field=models.ForeignKey(blank=True, help_text='The attribute this question belongs to.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='questions', to='domain.Attribute', verbose_name='Attribute'),
        ),
        migrations.AlterField(
            model_name='question',
            name='conditions',
            field=models.ManyToManyField(blank=True, help_text='List of conditions evaluated for this question.', related_name='questions', to='conditions.Condition', verbose_name='Conditions'),
        ),
        migrations.AlterField(
            model_name='question',
            name='optionsets',
            field=models.ManyToManyField(blank=True, help_text='Option sets for this question.', related_name='questions', to='options.OptionSet', verbose_name='Option sets'),
        ),
        migrations.AlterField(
            model_name='questionset',
            name='attribute',
            field=models.ForeignKey(blank=True, help_text='The attribute this questionset belongs to.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='questionsets', to='domain.Attribute', verbose_name='Attribute'),
        ),
        migrations.AlterField(
            model_name='questionset',
            name='conditions',
            field=models.ManyToManyField(blank=True, help_text='List of conditions evaluated for this questionset.', related_name='questionsets', to='conditions.Condition', verbose_name='Conditions'),
        ),
    ]
