import re
from rest_framework import serializers
from .models import Book

class BookSerializers(serializers.ModelSerializer):
    published = serializers.CharField(allow_blank=True, allow_null=True, required=False)

    def validate_published(self, value):
        if value:
            if not re.match(r'^\d{4}$', value):
                raise serializers.ValidationError("Published year must be a 4-digit number.")
            year = int(value)
            if year < 1000 or year > 2026:
                raise serializers.ValidationError("Published year must be between 1000 and 2026.")
        return value

    class Meta:
        model = Book
        fields = "__all__"