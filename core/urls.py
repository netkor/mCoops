
from django.urls import path
from. import views

urlpatterns = [
    path("", views.home, name="home"),
    path("upload/", views.custom_upload_function, name="custom_upload_file"),
]
