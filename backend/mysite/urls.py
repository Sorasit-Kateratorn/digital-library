"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from apps.user.views import UserView, ProfileView
from apps.reading.views import ReadingView
from apps.readingprogress.views import ReadingProgressView
from apps.book.views import BookView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/profile/', ProfileView.as_view(), name='user_profile'),
    path('book/', BookView.as_view()),
    path('book/<int:pk>/', BookView.as_view()),
    path('user/', UserView.as_view()),
    path('user/<int:pk>/', UserView.as_view()),
    path('reading/', ReadingView.as_view()),
    path('reading/<int:pk>/', ReadingView.as_view()),
    path('readingprogress/', ReadingProgressView.as_view()),
    path('readingprogress/<int:pk>/', ReadingProgressView.as_view()),
    
]
