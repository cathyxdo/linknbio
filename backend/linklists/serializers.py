from rest_framework import serializers
from linklists.models import List, SocialMedia, Link
from django.contrib.auth.models import User

class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['id', 'type', 'link', 'list']

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'link', 'title', 'photo', 'list']

class ListSerializer(serializers.ModelSerializer):
    social_media_profiles = SocialMediaSerializer(many=True, read_only=True)
    links = LinkSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = ['id', 'user', 'name', 'bio', 'photo', 'profile_font', 'profile_font_color', 'background_flag', 'background_color', 'background_image', 'link_bubble_style', 'link_bubble_color', 'link_font', 'link_font_color', 'social_media_icons_location', 'social_media_profiles', 'links']


