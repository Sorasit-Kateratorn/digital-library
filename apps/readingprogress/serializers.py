from rest_framework import serializers
from .models import ReadingProgress

class ReadingProgressSerializers(serializers.ModelSerializer):
    class Meta:
        model = ReadingProgress
        fields = "__all__"