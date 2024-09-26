from django.db import models
from django.conf import settings
from .validators import validate_name

#from django.contrib.auth.models import User

# Create your models here.

class List(models.Model):
    BUBBLE_STYLE_CHOICES = [
        ('bubble_style_1', 'Bubble Style 1'),
        ('bubble_style_2', 'Bubble Style 2'),
        ('bubble_filled', 'Bubble Filled'),
        ('bubble_filled_rounded', 'Bubble Filled Rounded'),
        ('bubble_filled_circular', 'Bubble Filled Circular'),
        ('bubble_outline', 'Bubble Outline'),
        ('bubble_outline_rounded', 'Bubble Outline Rounded'),
        ('bubble_outline_circular', 'Bubble Outline Circular'),
        ('bubble_shadow', 'Bubble Shadow'),
        ('bubble_shadow_rounded', 'Bubble Shadow Rounded'),
        ('bubble_shadow_circular', 'Bubble Shadow Circular'),
        # Add more choices as needed
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name="lists")
    name = models.CharField(max_length=255, unique=True, validators=[validate_name]) 
    bio = models.CharField(max_length=255, blank=True, null=True)
    #photo = models.ImageField(upload_to='profile_photos/')
    profile_photo_url = models.URLField(null=True, blank=True)
    profile_font = models.CharField(max_length=255, default='sans-serif')
    profile_font_color = models.CharField(max_length=7, default='#000000')  # Hex code for color
    background_flag = models.CharField(max_length=10, choices=[('color', 'Color'), ('image', 'Image')], default="color")
    background_color = models.CharField(max_length=7, default='#FFFFFF')  # Hex code for color
    #background_image = models.ImageField(upload_to='profile_backgrounds/', blank=True, null=True)
    background_image_url = models.URLField(null=True, blank=True)

    link_bubble_style = models.CharField(max_length=30, choices=BUBBLE_STYLE_CHOICES, default="bubble_style_1")
    link_bubble_color = models.CharField(max_length=7, default='#000000')  # Hex code for color
    link_font = models.CharField(max_length=255, default='sans-serif')
    link_font_color = models.CharField(max_length=7, default='#000000')  # Hex code for color
    social_media_icons_location = models.CharField(max_length=10, choices=[('top', 'Top'), ('bottom', 'Bottom')], default='bottom')

    def __str__(self):
        return self.name
    
class SocialMedia(models.Model):
    SOCIAL_MEDIA_CHOICES = [
        ('instagram', 'Instagram'),
        ('facebook', 'Facebook'),
        ('twitter', 'Twitter'),
        ('youtube', 'Youtube'),

        # Add more choices as needed
    ]

    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='social_media_profiles')
    type = models.CharField(max_length=20, choices=SOCIAL_MEDIA_CHOICES)
    link = models.URLField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}'s {self.type} profile"

class Link(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE, related_name='links')
    link = models.URLField()
    title = models.CharField(max_length=255)
   #photo = models.ImageField(upload_to='link_photos/', blank=True, null=True)
    link_photo_url = models.URLField(null=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"Link: {self.title}"