from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializers

# Create your views here.

@api_view(['GET'])
def list_task(request):
    tasks = Task.objects.all()
    serializer = TaskSerializers(tasks, many=True)  #here dont need data = because that is from the model, converted to JSON
    return Response(serializer.data)

@api_view(['POST'])
def add_task(request):
    serializer = TaskSerializers(data=request.data)     #needs data = request.data, because it is coming from the user, converted to model
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT',  'DELETE'])
def task_detail(request, pk):
    try:
        task = Task.objects.get(pk=pk)
    except Task.DoesNotExist:
        return Response(status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = TaskSerializers(task, data = request.data)     # we need to input task, because if not it just like we are creating a new task, we want to update not create new one
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)    
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        task.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)