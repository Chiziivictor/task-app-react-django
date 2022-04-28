from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def index(request):
    return Response("This is the main page")


@api_view(['POST'])
def task_create(request):

    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)


@api_view(['GET'])
def task_list(request):
    queryset = Task.objects.all()
    serializer = TaskSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def task_detail(request, pk):
    qs = Task.objects.get(id=pk) or None
    
    if qs is not None:
        serializer = TaskSerializer(qs, many=False)

        return Response(serializer.data)
    return Response("Task not found", status=403)



@api_view(['GET'])
def task_delete(request, pk):
    qs = Task.objects.filter(id=pk) or None
    if qs.exists():
        qs.delete()
        return Response(f"Task deleted", status=200)
    return Response("Invalid action", status=403)