from rest_framework.decorators import api_view
from rest_framework.response import Response
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
        return Response(serializer.data, status = 201)
    return Response(serializer.errors, status = 400)

