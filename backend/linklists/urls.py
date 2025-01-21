from django.urls import path, include
from linklists.views import LinkDetail, CreateLink, ListDetail, ListList, SocialMediaDetail, CreateSocialMedia, ImageUploadView, ImageDeleteView, ProfileImageDeleteView, ProfileImageUploadView, CheckListUsernameView, ListByUsernameView, LogListViewView, LogLinkClickView, LogSocialMediaClickView, AnalyticsView, AnalyticsView2

urlpatterns = [
    path("api/lists/<int:pk>/", ListDetail.as_view(), name='list_modify'),
    path('api/lists/view/<str:username>/', ListByUsernameView.as_view(), name='get_list_by_name'),
    path("api/lists/", ListList.as_view(), name='list_create'),
    path("api/lists/check-username/", CheckListUsernameView.as_view(), name="check-list-name"),
    path("api/links/<int:pk>/", LinkDetail.as_view(), name='link_modify'),
    path("api/links/", CreateLink.as_view(), name='link_create'),
    path("api/social-media-profiles/<int:pk>/", SocialMediaDetail.as_view(), name='social_media_profile_modify'),
    path("api/social-media-profiles/", CreateSocialMedia.as_view(), name='social_media_profile_create'),  
    path('api/links/<int:pk>/image/upload/', ImageUploadView.as_view(), name='image-upload'),
    path('api/links/<int:pk>/image/delete/', ImageDeleteView.as_view(), name='image-delete'),
    path('api/lists/<int:pk>/profile-image/upload/', ProfileImageUploadView.as_view(), name='profile-image-upload'),
    path('api/lists/<int:pk>/profile-image/delete/', ProfileImageDeleteView.as_view(), name='profile-image-delete'),
    path('api/analytics/page_views/', LogListViewView.as_view(), name='list_view'),
    path('api/analytics/link_clicks/', LogLinkClickView.as_view(), name='log_link_click'),
    path('api/analytics/social_media_clicks/', LogSocialMediaClickView.as_view(), name='log_social_media_click'),
    path('api/analytics/', AnalyticsView.as_view(), name='analytics'),
    path('api/analytics2/', AnalyticsView2.as_view(), name='analytics'),


    path('api/user/', include('users.urls', namespace='users')),

]