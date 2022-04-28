from django.urls import path
from .views import (
    index,
    task_create,
    task_list,
    task_detail,
    task_delete
)


urlpatterns = [ 
    path('', index),
    path('api/create/', task_create),
    path('api/list/', task_list),
    path('api/detail/<int:pk>/', task_detail),
    path('api/delete/<int:pk>/', task_delete),
]