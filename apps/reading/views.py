from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Reading
# Create your views here.
class ReadingView(APIView):
    pass