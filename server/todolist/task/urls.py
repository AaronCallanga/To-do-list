from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_task, name='list_task'),
    path('add-task/', views.add_task, name='add_task'),
]