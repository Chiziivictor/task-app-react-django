from .models import Task
from .serializers import TaskSerializer
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
)


User = get_user_model()

@api_view(['GET'])
def index(request):
    return Response("This is the main page")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def task_create(request):
    user = request.user
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_list(request):
    user = request.user or None
    if user in User.objects.all():
        queryset = user.task_set.all().order_by('-id')
        serializer = TaskSerializer(queryset, many=True)
        return Response(serializer.data)
    elif user==None:
        qs = Task.objects.filter(user=None)
        serializer = TaskSerializer(qs, many=True)
        return Response(serializer.data)
    else:
        return Response("No data not found")


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_update(request, pk):

    user = request.user
    try:
        task = Task.objects.get(id=pk, user=user)
    except:
        task = None

    if task is not None:
        if request.method == 'GET':
            serializer = TaskSerializer(task, many=False)
            return Response(serializer.data)
        if request.method == 'POST':
            serializer = TaskSerializer(instance=task, data=request.data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response(serializer.data, status=200)
    else:
        return Response({"error": "This item does not exist or you don't have access."}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_detail(request, pk):
    user = request.user
    try:
        qs = Task.objects.get(id=pk, user=user)
    except:
        qs = None

    if qs is not None:
        serializer = TaskSerializer(qs, many=False)
        return Response(serializer.data)
    else:
        return Response({"error": "This item does not exist or you don't have access."}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def task_delete(request, pk):
    user = request.user
    qs = user.task_set.filter(id=pk) or None
    if qs.exists():
        qs.delete()
        return Response(f"Task deleted", status=200)
    return Response("Invalid action", status=403)


@api_view(['POST'])
def user_register(request):

    if request.method == 'POST':
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response(serializer.data)

        return Response('not created.')


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
