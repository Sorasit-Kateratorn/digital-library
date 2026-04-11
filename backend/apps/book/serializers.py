from rest_framework import serializers
from .models import Book

class BookSerializers(serializers.ModelSerializer):
    published = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    class Meta:
        model = Book
        fields = "__all__"