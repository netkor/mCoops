from django.shortcuts import render

# Create your views here.
def custom_upload_function(instance, filename):
    # Your logic for handling the upload
    return f'uploads/{filename}'  # Example return statement