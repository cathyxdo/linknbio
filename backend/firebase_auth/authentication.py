# settings.py

import firebase_admin
from firebase_admin import auth, credentials

from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

from users.models import CustomUser 
import os

# At the top of your authentication file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FIREBASE_KEY_PATH = os.path.join(BASE_DIR, 'serviceAccountKey.json')

# Then use FIREBASE_KEY_PATH when initializing Firebase
cred = credentials.Certificate(FIREBASE_KEY_PATH)
firebase_admin.initialize_app(cred)

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        print("Authorization header:", auth_header)  # Debugging

        if not auth_header:
            print("No Authorization header found.")

            return None

        try:
            token = auth_header.split(" ").pop()
            decoded_token = auth.verify_id_token(token)
            uid = decoded_token['uid']

            # Fetch or create the user from your database
            user, created = CustomUser.objects.get_or_create(firebase_uid=uid, defaults={'email': decoded_token.get('email', '')})
            return (user, None)

        except Exception as e:
            print(f"Error authenticating token: {e}")  # Debugging error

            raise AuthenticationFailed('Invalid token')

