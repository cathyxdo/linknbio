from linklists.models import Link, SocialMedia, List, LogListView, LogLinkClick, LogSocialMediaClick
from linklists.serializers import LinkSerializer, SocialMediaSerializer, ListSerializer, ListViewSerializer, LinkClickSerializer, SocialMediaClickSerializer, ListViewCountSerializer, LinkClickCountSerializer, SocialMediaClickCountSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .permissions import IsOwnerOrReadOnly
import boto3
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from django.utils import timezone
from django.db.models import Count, F
from django.db.models.functions import TruncDate

class CheckListUsernameView(APIView):
    def get(self, request, *args, **kwargs):
        list_username = request.query_params.get('list_username', None)
        if list_username and List.objects.filter(username=list_username).exists():
            return Response({"exists": True}, status=status.HTTP_200_OK)
        return Response({"exists": False}, status=status.HTTP_200_OK)
    
class ProfileImageUploadView(APIView):
    def post(self, request, pk, format=None):
        try:
            list = List.objects.get(id=pk)
        except List.DoesNotExist:
            return Response({'error': 'List not found'}, status=status.HTTP_404_NOT_FOUND)

        # Ensure 'file' field exists in the request
        if 'file' not in request.data:
            return Response({'error': 'No file found in request'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the file object from the request
        file_obj = request.data['file']

        # Connect to S3 bucket
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

        try:
            # Upload file to S3 bucket
            s3.upload_fileobj(file_obj, settings.AWS_STORAGE_BUCKET_NAME, file_obj.name)

            # Get the URL of the uploaded file
            file_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{file_obj.name}"

            # Update the link_photo_url field of the Link object
            list.profile_photo_url = file_url
            list.save()
            serializer = ListSerializer(list)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class ProfileImageDeleteView(APIView):
    def delete(self, request, pk, format=None):
        try:
            list = List.objects.get(id=pk)
        except List.DoesNotExist:
            return Response({'error': 'Link not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Get the current image URL
        file_url = list.profile_photo_url

        # Connect to S3 bucket
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

        try:
            # Extract the filename from the URL
            file_name = file_url.split('/')[-1]

            # Delete the file from S3 bucket
            s3.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)

            # Update the link_photo_url field of the Link object
            list.link_photo_url = ''
            list.save()
            serializer = ListSerializer(list)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ImageUploadView(APIView):
    def post(self, request, pk, format=None):
        try:
            link = Link.objects.get(id=pk)
        except Link.DoesNotExist:
            return Response({'error': 'Link not found'}, status=status.HTTP_404_NOT_FOUND)

        # Ensure 'file' field exists in the request
        if 'file' not in request.data:
            return Response({'error': 'No file found in request'}, status=status.HTTP_400_BAD_REQUEST)

        # Get the file object from the request
        file_obj = request.data['file']

        # Connect to S3 bucket
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

        try:
            # Upload file to S3 bucket
            s3.upload_fileobj(file_obj, settings.AWS_STORAGE_BUCKET_NAME, file_obj.name)

            # Get the URL of the uploaded file
            file_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{file_obj.name}"

            # Update the link_photo_url field of the Link object
            link.link_photo_url = file_url
            link.save()
            serializer = LinkSerializer(link)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ImageDeleteView(APIView):
    def delete(self, request, pk, format=None):
        try:
            link = Link.objects.get(id=pk)
        except Link.DoesNotExist:
            return Response({'error': 'Link not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Get the current image URL
        file_url = link.link_photo_url

        # Connect to S3 bucket
        s3 = boto3.client('s3',
                          aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)

        try:
            # Extract the filename from the URL
            file_name = file_url.split('/')[-1]

            # Delete the file from S3 bucket
            s3.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=file_name)

            # Update the link_photo_url field of the Link object
            link.link_photo_url = ''
            link.save()
            serializer = LinkSerializer(link)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = List.objects.all()
    serializer_class = ListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return List.objects.filter(user=user)
    
class ListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [IsOwnerOrReadOnly]

class CreateLink(generics.ListCreateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return Link.objects.filter(user=user)

class LinkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    permission_classes = [IsOwnerOrReadOnly]

class CreateSocialMedia(generics.ListCreateAPIView):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        user = self.request.user
        return SocialMedia.objects.filter(user=user)
class SocialMediaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer
    permission_classes = [IsOwnerOrReadOnly]

class ListByUsernameView(generics.RetrieveAPIView):
    serializer_class = ListSerializer
    lookup_field = 'username'

    def get_queryset(self):
        return List.objects.all()

class LogListViewView(APIView):
    def post(self, request):
        list_id = request.data.get('list_id')
        list_instance = get_object_or_404(List, id=list_id)

        # Create a PageView instance without device type
        page_view = LogListView(list=list_instance)
        page_view.save()
        
        return Response({'message': 'Page view logged successfully'}, status=status.HTTP_201_CREATED)
    
class LogLinkClickView(APIView):
    def post(self, request):
        link_id = request.data.get('link_id')
        link_instance = get_object_or_404(Link, id=link_id)

        # Create a LinkClick instance
        link_click = LogLinkClick(link=link_instance)
        link_click.save()
        
        return Response({'message': 'Link click logged successfully'}, status=status.HTTP_201_CREATED)


class LogSocialMediaClickView(APIView):
    def post(self, request):
        social_media_profile_id = request.data.get('social_media_profile_id')
        social_media_instance = get_object_or_404(SocialMedia, id=social_media_profile_id)

        # Create a SocialMediaClick instance
        social_media_click = LogSocialMediaClick(social_media_profile=social_media_instance)
        social_media_click.save()
        
        return Response({'message': 'Social media click logged successfully'}, status=status.HTTP_201_CREATED)

class AnalyticsView(APIView):
    def get(self, request):
        user = request.user

        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        try:
            list_obj = List.objects.filter(user=user).first()
            if not list_obj:
                return Response({"detail": "No list found for the authenticated user."}, status=status.HTTP_404_NOT_FOUND)
        except List.DoesNotExist:
            return Response({"detail": "List not found."}, status=status.HTTP_404_NOT_FOUND)

        # Default to the last 30 days if start_date or end_date are not provided
        if not start_date or not end_date:
            end_date = timezone.now()  # Use timezone-aware current time
            start_date = end_date - timedelta(days=30)
        else:
            try:
                # Convert the string to a naive datetime object first
                start_date = datetime.strptime(start_date, '%Y-%m-%d')
                end_date = datetime.strptime(end_date, '%Y-%m-%d')
                
                # Make both datetime objects timezone-aware
                start_date = timezone.make_aware(start_date, timezone.get_current_timezone())
                end_date = timezone.make_aware(end_date, timezone.get_current_timezone())
                
            except ValueError:
                return Response({"detail": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Aggregate LogListView (Page Views per day)
        page_views = LogListView.objects.filter(
            list=list_obj,
            date__range=[start_date, end_date]
        ).annotate(
            truncated_date=TruncDate('date')
        ).values('truncated_date').annotate(
            count=Count('id')
        ).order_by('truncated_date')

        # Aggregate LogLinkClick (Link Clicks per day)
        link_clicks = LogLinkClick.objects.filter(
            link__list=list_obj,
            date__range=[start_date, end_date]
        ).annotate(
            truncated_date=TruncDate('date')
        ).values('truncated_date', 'link__title', 'link__link').annotate(
            count=Count('id')
        ).order_by('truncated_date')

        # Aggregate LogSocialMediaClick (Social Media Clicks per day)
        social_media_clicks = LogSocialMediaClick.objects.filter(
            social_media_profile__list=list_obj,
            date__range=[start_date, end_date]
        ).annotate(
            truncated_date=TruncDate('date')
        ).values('truncated_date', 'social_media_profile__type', 'social_media_profile__link').annotate(
            count=Count('id')
        ).order_by('truncated_date')

        # Serialize results
        page_views_data = ListViewCountSerializer(page_views, many=True).data
        link_clicks_data = LinkClickCountSerializer(link_clicks, many=True).data
        social_media_clicks_data = SocialMediaClickCountSerializer(social_media_clicks, many=True).data
        
        # Return aggregated data
        return Response({
            'list_id': list_obj.id,
            'list_username':list_obj.username,
            'page_views': page_views_data,
            'link_clicks': link_clicks_data,
            'social_media_clicks': social_media_clicks_data
        })

class AnalyticsView2(APIView):
    def get(self, request):
        user = request.user

        # Get query parameters for date range
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        try:
            list_obj = List.objects.filter(user=user).first()
            if not list_obj:
                return Response({"detail": "No list found for the authenticated user."}, status=status.HTTP_404_NOT_FOUND)
        except List.DoesNotExist:
            return Response({"detail": "List not found."}, status=status.HTTP_404_NOT_FOUND)

        # Default date range to the last 30 days if not provided
        if not start_date or not end_date:
            end_date = timezone.now()
            start_date = end_date - timedelta(days=30)
        else:
            try:
                start_date = timezone.make_aware(datetime.strptime(start_date, '%Y-%m-%d'), timezone.get_current_timezone())
                end_date = timezone.make_aware(datetime.strptime(end_date, '%Y-%m-%d'), timezone.get_current_timezone())
            except ValueError:
                return Response({"detail": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

        # Aggregate page views
        page_views = LogListView.objects.filter(
            list=list_obj,
            date__range=[start_date, end_date]
        ).annotate(
            truncated_date=TruncDate('date')
        ).values('truncated_date').annotate(
            count=Count('id')
        ).order_by('truncated_date')

        # Aggregate link clicks
        link_clicks = LogLinkClick.objects.filter(
            link__list=list_obj,
            date__range=[start_date, end_date]
        ).annotate(
            truncated_date=TruncDate('date')
        ).values('truncated_date', 'link__id', 'link__title', 'link__link').annotate(
            count=Count('id')
        ).order_by('truncated_date')

        # Aggregate social media clicks
        social_media_clicks = LogSocialMediaClick.objects.filter(
            social_media_profile__list=list_obj,
            date__range=[start_date, end_date]
        ).annotate(
            truncated_date=TruncDate('date')
        ).values('truncated_date', 'social_media_profile__id', 'social_media_profile__type', 'social_media_profile__link').annotate(
            count=Count('id')
        ).order_by('truncated_date')

        # Restructure page views data
        page_views_data = [
            {"date": view['truncated_date'], "count": view['count']}
            for view in page_views
        ]

        # Restructure link clicks data
        links_data = {}
        for click in link_clicks:
            key = click['link__id']
            if key not in links_data:
                links_data[key] = {
                    "link_id": key,
                    "link_title": click['link__title'],
                    "link_url": click['link__link'],
                    "clicks": []
                }
            links_data[key]["clicks"].append({
                "date": click['truncated_date'],
                "count": click['count']
            })
        links_data = list(links_data.values())

        # Restructure social media clicks data
        social_media_data = {}
        for click in social_media_clicks:
            key = click['social_media_profile__id']
            if key not in social_media_data:
                social_media_data[key] = {
                    "social_media_profile_id": key,
                    "social_media_profile_type": click['social_media_profile__type'],
                    "social_media_profile_url": click['social_media_profile__link'],
                    "clicks": []
                }
            social_media_data[key]["clicks"].append({
                "date": click['truncated_date'],
                "count": click['count']
            })
        social_media_data = list(social_media_data.values())

        # Return the aggregated data
        return Response({
            'list_id': list_obj.id,
            'list_username': list_obj.username,
            'page_views': page_views_data,
            'links': links_data,
            'social_media': social_media_data
        })
