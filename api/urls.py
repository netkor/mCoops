# api/urls.py
from django.urls import path
from. import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
urlpatterns = [
    path('posts', views.post_list, name='post-list'),    
    path('settings', views.setting_list, name='setting-list'),
]