from linklists.models import Link, SocialMedia, List, PageView, LinkClick, SocialMediaClick
from linklists.serializers import LinkSerializer, SocialMediaSerializer, ListSerializer, PageViewSerializer, LinkClickSerializer, SocialMediaClickSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from .permissions import IsOwnerOrReadOnly
import boto3
from django.shortcuts import get_object_or_404



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

class PageViewLogger(APIView):
    def post(self, request):
        list_id = request.data.get('list_id')
        ip_address = request.META.get('REMOTE_ADDR')
        list_instance = get_object_or_404(List, id=list_id)

        # Create a PageView instance without device type
        page_view = PageView(list_id=list_instance, ip_address=ip_address)
        page_view.save()
        
        return Response({'message': 'Page view logged successfully'}, status=status.HTTP_201_CREATED)
    
class LinkClickLogger(APIView):
    def post(self, request):
        link_id = request.data.get('link_id')
        ip_address = request.META.get('REMOTE_ADDR')
        link_instance = get_object_or_404(Link, id=link_id)

        # Create a LinkClick instance
        link_click = LinkClick(link_id=link_instance, ip_address=ip_address)
        link_click.save()
        
        return Response({'message': 'Link click logged successfully'}, status=status.HTTP_201_CREATED)


class SocialMediaClickLogger(APIView):
    def post(self, request):
        social_media_profile_id = request.data.get('social_media_profile_id')
        ip_address = request.META.get('REMOTE_ADDR')
        social_media_instance = get_object_or_404(SocialMedia, id=social_media_profile_id)

        # Create a SocialMediaClick instance
        social_media_click = SocialMediaClick(social_media_profile_id=social_media_instance, ip_address=ip_address)
        social_media_click.save()
        
        return Response({'message': 'Social media click logged successfully'}, status=status.HTTP_201_CREATED)
