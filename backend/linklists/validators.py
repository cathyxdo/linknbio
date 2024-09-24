from django.core.exceptions import ValidationError
import re

def validate_name(value):
    # Check for spaces or invalid characters
    if value != value.strip():
        raise ValidationError("Title cannot start or end with spaces.")
    if " " in value:
        raise ValidationError("Title cannot contain spaces.")
    if re.search(r'[^a-zA-Z0-9_]', value):
        raise ValidationError("Title can only contain letters, numbers, and underscores.")
