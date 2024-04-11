from linklists.models import Link, SocialMedia, List
from linklists.serializers import LinkSerializer, SocialMediaSerializer, ListSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import boto3

class ImageUploadView(APIView):
    def post(self, request, format=None):
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

            return Response({'url': file_url}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListList(generics.ListCreateAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return List.objects.filter(user=user)

class ListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]

class CreateLink(generics.ListCreateAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

class LinkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer

class CreateSocialMedia(generics.ListCreateAPIView):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer
    #permission_classes = [IsAuthenticated]

class SocialMediaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SocialMedia.objects.all()
    serializer_class = SocialMediaSerializer