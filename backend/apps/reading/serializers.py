from rest_framework import serializers
from .models import Reading

class ReadingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Reading
        fields = "__all__"