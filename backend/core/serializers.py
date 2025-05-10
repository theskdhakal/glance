from rest_framework import serializers
from .models import Image, Like
from django.contrib.auth.models import User

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id', 'username']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Like
        fields='__all__'

class ImageSerializer(serializers.ModelSerializer):
    uploaded_by=UserSerializers(read_only=True)
    likes=serializers.SerializerMethodField()

    class Meta:
        model=Image
        fields=['id','title','image','uploaded_by','created_at','likes']

    def get_likes(self, obj):
        return obj.likes.count()
