# Generated by Django 5.0.3 on 2024-03-27 10:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='coproprietaire',
            old_name='forkey',
            new_name='syndic',
        ),
        migrations.RenameField(
            model_name='copropriete',
            old_name='forkey',
            new_name='syndic',
        ),
    ]
