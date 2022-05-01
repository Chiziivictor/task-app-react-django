from django.db import models
from rest_framework import serializers
from .models import Task
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        user = User(
            email=self.validated_data['email'],
            username=self.validated_data['username']
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password is not None and password != password2:
            raise serializers.ValidationError(
                {"password": "Passwords must match."})
        user.set_password(password)
        user.save()
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token


class TaskSerializer(serializers.ModelSerializer):

    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Task
        fields = "__all__"
