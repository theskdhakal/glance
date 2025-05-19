from rest_framework import generics, permissions, status
from .models import Image, Like
from .serializers import ImageSerializer, UserSerializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.permissions import AllowAny


class RegisterUserView(APIView):
    permission_classes=[AllowAny]


    def post(self,request):
        #extract data from request

        username=request.data.get('username')
        email=request.data.get('email')
        password=request.data.get('password')

        #validate that we have all required fields
        if not username or not email or not password:
            return Reponse({"error":"Username, email and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        #check if user already exist
        if User.objects.filter(username=username).exists():
            return Response({"error":"Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        #check if user already exist
        if User.objects.filter(email=email).exists():
            return Response({"error":"Email already exists."}, status=status.HTTP_400_BAD_REQUEST)


        #create new user
        user=User.objects.create_user(username=username, email=email, password=password)

        #serialize the new created user
        user_data=UserSerializers(user).data

        return Response(user_data,status=status.HTTP_201_CREATED)


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

class LoginUserView(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(Self, request):
        serializer=UserSerializers(request.user)
        return Response(serializer.data)

