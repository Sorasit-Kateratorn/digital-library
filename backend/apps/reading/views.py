from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import OuterRef, Subquery
from .models import Reading
from apps.readingprogress.models import ReadingProgress
from .serializers import ReadingSerializers, ReadingListSerializer

class ReadingView(APIView):
    def get(self, request, pk=None): 
        if pk:
            try:
                reading = Reading.objects.get(pk=pk)
                serializer = ReadingSerializers(reading)
            except:
                return Response({}, status=status.HTTP_200_OK)
        else: 
            user_id = request.query_params.get('user_id')
            readings = Reading.objects.all()
            if user_id:
                readings = readings.filter(user_id=user_id)
            elif request.user.is_authenticated:
                readings = readings.filter(user=request.user)
            
            latest_progress = ReadingProgress.objects.filter(
                reading=OuterRef('pk')
            ).order_by('-created_at')

            readings = readings.select_related('book').annotate(
                current_page=Subquery(latest_progress.values('page_number')[:1]),
                latest_note=Subquery(latest_progress.values('summarize')[:1])
            )
            serializer = ReadingListSerializer(readings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)
            
        book_id = request.data.get('book')
        if not book_id:
            return Response({"detail": "Book ID is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        reading, created = Reading.objects.get_or_create(
            user=request.user,
            book_id=book_id,
            defaults={'rating': request.data.get('rating', 0)}
        )
        
        serializer = ReadingSerializers(reading)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        
        
    def put(self, request, pk=None):
        if pk is None:
            return Response(
                {"detail": "PUT requires pk in URL."},
                status=status.HTTP_400_BAD_REQUEST
            )

        reading = get_object_or_404(Reading, pk=pk)
        serializer = ReadingSerializers(reading, data=request.data)  # full update
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

        reading = get_object_or_404(Reading, pk=pk)
        serializer = ReadingSerializers(reading, data=request.data, partial=True)
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

        reading = get_object_or_404(Reading, pk=pk)
        reading.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)