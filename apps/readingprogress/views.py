from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ReadingProgress
from .serializers import ReadingProgressSerializers
# Create your views here.
class ReadingProgressView(APIView):
    def get(self, request, pk=None): # pk = primary key = id
        if pk:
            try:
                readingprogress = ReadingProgress.objects.get(pk=pk) # get = get 1 record
                serializer = ReadingProgressSerializers(readingprogress)
            except:
                return Response({}, status=status.HTTP_200_OK)
        else: 
            readingprogresses = ReadingProgress.objects.all()
            serializer = ReadingProgressSerializers(readingprogresses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = ReadingProgressSerializers(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
    def put(self, request, pk=None):
        if pk is None:
            return Response(
                {"detail": "PUT requires pk in URL."},
                status=status.HTTP_400_BAD_REQUEST
            )

        readingprogress = get_object_or_404(ReadingProgress, pk=pk)
        serializer = ReadingProgressSerializers(readingprogress, data=request.data)  # full update
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk=None):
        if pk is None:
            return Response(
                {"detail": "PATCH requires pk in URL."},
                status=status.HTTP_400_BAD_REQUEST
            )

        readingprogress = get_object_or_404(ReadingProgress, pk=pk)
        serializer = ReadingProgressSerializers(readingprogress, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        if pk is None:
            return Response(
                {"detail": "DELETE requires pk in URL."},
                status=status.HTTP_400_BAD_REQUEST
            )

        readingprogress = get_object_or_404(ReadingProgress, pk=pk)
        readingprogress.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)