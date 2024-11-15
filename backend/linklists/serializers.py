from rest_framework import serializers
from linklists.models import List, SocialMedia, Link, LogListView, LogLinkClick, LogSocialMediaClick

class SocialMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMedia
        fields = ['id', 'type', 'link', 'list']

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'link', 'title', 'link_photo_url', 'is_active', 'list']

class ListSerializer(serializers.ModelSerializer):
    social_media_profiles = SocialMediaSerializer(many=True, read_only=True)
    links = LinkSerializer(many=True, read_only=True)

    class Meta:
        model = List
        fields = ['id', 'user', 'username', 'name', 'bio', 'profile_photo_url', 'profile_font', 'profile_font_color', 'background_flag', 'background_color', 'background_image_url', 'link_bubble_style', 'link_bubble_color', 'link_font', 'link_font_color', 'social_media_icons_location', 'social_media_profiles', 'links']

class ListViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogListView
        fields = ['list_id', 'date']

class LinkClickSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogLinkClick
        fields = ['link_id', 'date']

class SocialMediaClickSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogSocialMediaClick
        fields = ['social_media_profile_id', 'date']

class ListViewCountSerializer(serializers.Serializer):
    date = serializers.DateField(source='truncated_date')  # Matches 'date_only' in queryset
    count = serializers.IntegerField()  # Matches 'count' in queryset


class LinkClickCountSerializer(serializers.Serializer):
    date = serializers.DateField(source='truncated_date')   # Matches 'date_only' in queryset
    link_title = serializers.CharField(source='link__title')  # Matches 'link__title' in queryset
    link_url = serializers.URLField(source='link__link')  # Matches 'link__url' in queryset
    count = serializers.IntegerField()  # Matches 'count' in queryset

class SocialMediaClickCountSerializer(serializers.Serializer):
    date = serializers.DateField(source='truncated_date')  # Matches 'date_only' in queryset
    social_media_profile_type = serializers.CharField(source='social_media_profile__type')  # Matches 'social_media_profile__type'
    social_media_profile_url = serializers.URLField(source='social_media_profile__link')  # Matches 'social_media_profile__link'
    count = serializers.IntegerField()  # Matches 'count' in queryset
