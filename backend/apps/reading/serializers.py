from rest_framework import serializers
from .models import Reading
from apps.book.serializers import BookSerializers

class ReadingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reading
        fields = "__all__"

class ReadingListSerializer(serializers.ModelSerializer):
    book = BookSerializers(read_only=True)
    current_page = serializers.IntegerField(read_only=True)
    latest_note = serializers.CharField(read_only=True)

    class Meta:
        model = Reading
        fields = ['id', 'user', 'book', 'rating', 'created_at', 'current_page', 'latest_note']