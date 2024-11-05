# api/views/posts.py
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializers.posts import PostSerializer
from .serializers.settings import SettingSerializer
#import models from core app
from core.models import Post, Setting

@api_view(['GET'])
def post_list(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def setting_list(request):
    settings = Setting.objects.all()
    serializer = SettingSerializer(settings, many=True)
    return Response(serializer.data)
# api/views/settings.py