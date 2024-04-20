from django.urls import path
from linklists.views import LinkDetail, CreateLink, ListDetail, ListList, SocialMediaDetail, CreateSocialMedia, ImageUploadView, ImageDeleteView

urlpatterns = [
    path("api/lists/<int:pk>/", ListDetail.as_view(), name='list_modify'),
    path("api/lists/", ListList.as_view(), name='list_create'),
    path("api/links/<int:pk>/", LinkDetail.as_view(), name='link_modify'),
    path("api/links/", CreateLink.as_view(), name='link_create'),
    path("api/social-media-profiles/<int:pk>/", SocialMediaDetail.as_view(), name='social_media_profile_modify'),
    path("api/social-media-profiles/", CreateSocialMedia.as_view(), name='social_media_profile_create'),  
    path('api/upload-image/links/<int:pk>/', ImageUploadView.as_view(), name='image-upload'),
    path('api/delete-image/links/<int:pk>/', ImageDeleteView.as_view(), name='image-delete'),

]