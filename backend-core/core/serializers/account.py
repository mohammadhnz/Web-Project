from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer
from django.contrib.auth.hashers import make_password


class AccountRegisterSerializer(Serializer):
    username = serializers.CharField(required=True, write_only=True)
    password = serializers.CharField(required=True, write_only=True)
    password_confirm = serializers.CharField(required=True, write_only=True)
    email = serializers.EmailField(required=True, write_only=True)
    account_type = serializers.CharField(required=True, write_only=True)
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)
    gender = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise ValidationError('Passwords are not equal!')
        data['password'] = make_password(data['password'])
        return data

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password': self.validated_data.get('password', ''),
            'email': self.validated_data.get('email', ''),
            'account_type': self.validated_data.get('account_type', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'gender': self.validated_data.get('gender', ''),
        }


class AccountBaseSerializer(ModelSerializer):
    account_type = serializers.CharField(max_length=16, write_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            'username',
            'password',
            'email',
            'account_type',
            'first_name',
            'last_name',
            'gender',
        )
        extra_kwargs = {
            'username': {'write_only': True},
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        with transaction.atomic():
            account_type = validated_data.pop('account_type')
            account = super().create(validated_data=validated_data)
            account.create_related_user(account_type)
            return account
