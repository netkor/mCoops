# api/serializers/posts.py
from rest_framework import serializers
from core.models import Setting

class SettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setting
        fields = '__all__'