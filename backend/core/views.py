from rest_framework import generics, permissions
from .models import Image, Like
from .serializers import ImageSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser,FormParser





class ImageListCreate(generics.ListCreateAPIView):
    queryset=Image.objects.all().order_by('-created_at')
    serializer_class=ImageSerializer
    permission_classes=[permissions.IsAuthenticatedOrReadOnly]
    parser_classes=[MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class ToggleLike(APIView):
    permission_classes= [permissions.IsAuthenticated]

    def post(self,request,pk):
        image=Image.objects.get(id=pk)
        like, created= Like.objects.get_or_create(user=request.user, image=image)
        if not created:
            like.delete()
            return Response({'liked': False})
        return Response({'liked':True})

