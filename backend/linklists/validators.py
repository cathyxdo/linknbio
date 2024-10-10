from django.core.exceptions import ValidationError
import re

def validate_username(value):
    # Check for spaces or invalid characters
    if value != value.strip():
        raise ValidationError("Username cannot start or end with spaces.")
    if " " in value:
        raise ValidationError("Username cannot contain spaces.")
    if re.search(r'[^a-zA-Z0-9_]', value):
        raise ValidationError("Username can only contain letters, numbers, and underscores.")
