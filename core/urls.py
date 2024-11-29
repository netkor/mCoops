
from django.urls import path
from .views import custom_upload_file

urlpatterns = [
    # path("", views.home, name="home"),
    path('custom-upload/', custom_upload_file, name='custom_upload_file'),
]
