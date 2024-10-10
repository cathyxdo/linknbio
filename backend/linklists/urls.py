from django.urls import path, include
from linklists.views import LinkDetail, CreateLink, ListDetail, ListList, SocialMediaDetail, CreateSocialMedia, ImageUploadView, ImageDeleteView, ProfileImageDeleteView, ProfileImageUploadView, CheckListNameView, ListByUsernameView

urlpatterns = [
    path("api/lists/<int:pk>/", ListDetail.as_view(), name='list_modify'),
    path('api/lists/view/<str:username>/', ListByUsernameView.as_view(), name='get_list_by_name'),
    path("api/lists/", ListList.as_view(), name='list_create'),
    path("api/check-list-name/", CheckListNameView.as_view(), name="check-list-name"),
    path("api/links/<int:pk>/", LinkDetail.as_view(), name='link_modify'),
    path("api/links/", CreateLink.as_view(), name='link_create'),
    path("api/social-media-profiles/<int:pk>/", SocialMediaDetail.as_view(), name='social_media_profile_modify'),
    path("api/social-media-profiles/", CreateSocialMedia.as_view(), name='social_media_profile_create'),  
    path('api/upload-image/links/<int:pk>/', ImageUploadView.as_view(), name='image-upload'),
    path('api/delete-image/links/<int:pk>/', ImageDeleteView.as_view(), name='image-delete'),
    path('api/upload-profile-image/lists/<int:pk>/', ProfileImageUploadView.as_view(), name='profile-image-upload'),
    path('api/delete-profile-image/lists/<int:pk>/', ProfileImageDeleteView.as_view(), name='profile-image-delete'),

    path('api/user/', include('users.urls', namespace='users')),

]