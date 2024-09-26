# Generated by Django 4.2.8 on 2024-09-25 15:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import linklists.validators


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('linklists', '0002_link_user_socialmedia_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='list',
            name='background_flag',
            field=models.CharField(choices=[('color', 'Color'), ('image', 'Image')], default='color', max_length=10),
        ),
        migrations.AlterField(
            model_name='list',
            name='link_bubble_style',
            field=models.CharField(choices=[('bubble_style_1', 'Bubble Style 1'), ('bubble_style_2', 'Bubble Style 2'), ('bubble_filled', 'Bubble Filled'), ('bubble_filled_rounded', 'Bubble Filled Rounded'), ('bubble_filled_circular', 'Bubble Filled Circular'), ('bubble_outline', 'Bubble Outline'), ('bubble_outline_rounded', 'Bubble Outline Rounded'), ('bubble_outline_circular', 'Bubble Outline Circular'), ('bubble_shadow', 'Bubble Shadow'), ('bubble_shadow_rounded', 'Bubble Shadow Rounded'), ('bubble_shadow_circular', 'Bubble Shadow Circular')], default='bubble_style_1', max_length=30),
        ),
        migrations.AlterField(
            model_name='list',
            name='name',
            field=models.CharField(max_length=255, unique=True, validators=[linklists.validators.validate_name]),
        ),
        migrations.AlterField(
            model_name='list',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lists', to=settings.AUTH_USER_MODEL),
        ),
    ]
