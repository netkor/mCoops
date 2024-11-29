from django.shortcuts import render
from .models import Setting , Category,SocialLink
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def site_settings(request):
    # Fetch the first Setting object (or adjust as needed)
    setting = Setting.objects.first()
    categories=Category.objects.all()
    social_links = SocialLink.objects.all()  # Fetch all social links
    return {
        'site_setting': setting,
        'categories': categories,
        'social_links': social_links,
    }
@csrf_exempt
def custom_upload_file(instance, filename):
    # Your logic for handling the upload
    return JsonResponse({'message': 'File uploaded successfully'})  # Example return statement
# Setting Model Admin

def home(request):
    return render(request, 'base.html')