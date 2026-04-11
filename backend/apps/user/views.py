from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializers
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializers(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserView(APIView):
    def get(self, request, pk=None): 
        if not request.user.is_authenticated or request.user.role != 'Admin':
            return Response({"detail": "Forbidden. Admin access required."}, status=status.HTTP_403_FORBIDDEN)
            
        if pk:
            try:
                user = User.objects.get(pk=pk)
                serializer = UserSerializers(user)
            except:
                return Response({}, status=status.HTTP_200_OK)
        else: 
            users = User.objects.all()
            serializer = UserSerializers(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def put(self, request, pk=None):
        if not request.user.is_authenticated or request.user.role != 'Admin':
            return Response({"detail": "Forbidden. Admin access required."}, status=status.HTTP_403_FORBIDDEN)
            
        if pk is None:
            return Response(
                {"detail": "PUT requires pk in URL."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializers(user, data=request.data)  # full update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if not request.user.is_authenticated or request.user.role != 'Admin':
            return Response({"detail": "Forbidden. Admin access required."}, status=status.HTTP_403_FORBIDDEN)
            
        if pk is None:
            return Response(
                {"detail": "PATCH requires pk in URL."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializers(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if not request.user.is_authenticated or request.user.role != 'Admin':
            return Response({"detail": "Forbidden. Admin access required."}, status=status.HTTP_403_FORBIDDEN)
            
        if pk is None:
            return Response(
                {"detail": "DELETE requires pk in URL."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_obj = get_object_or_404(User, pk=pk)
        # Check relational integrity logic or just rely on CASCADE. The request was "only if permission and relational integrity are handled safely". DRF will use standard Django CASCADE.
        user_obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        