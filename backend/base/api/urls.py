from django.urls import path
from .views import (
    index,
    task_create,
    task_list,
    task_detail,
    task_update,
    task_delete,
    user_register,
    MyTokenObtainPairView,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [ 
    path('', index),
    path('api/create/', task_create),
    path('api/list/', task_list),
    path('api/detail/<int:pk>/', task_detail),
    path('api/update/<int:pk>/', task_update),
    path('api/delete/<int:pk>/', task_delete),

    path('api/accounts/register/', user_register),
    path('api/login/', MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]