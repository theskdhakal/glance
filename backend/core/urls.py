from django.urls import path
from .views import ImageListCreate, ToggleLike, RegisterUserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)



app_name='core'


urlpatterns = [
    path('images/', ImageListCreate.as_view()),
    path('images/<int:pk>/like/', ToggleLike.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('register/', RegisterUserView.as_view()),

]
