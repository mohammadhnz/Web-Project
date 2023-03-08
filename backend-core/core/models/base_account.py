from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.exceptions import ValidationError
from django.db import models

from core.models.base_model import BaseModel
from core.statics.user_types import user_types


class UserManager(BaseUserManager):
    def _create_user(self, username, password, is_superuser=False, is_staff=False, **extra_fields):
        if not username:
            raise ValidationError("The given username is not valid!")
        user = self.model(username=username, is_staff=is_staff, is_superuser=is_superuser,
                          **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extra_fields):
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        return self._create_user(username, password, is_superuser=True, is_staff=True, **extra_fields)


class BaseAccount(BaseModel, AbstractBaseUser, PermissionsMixin):
    GENDER_MALE = 'male'
    GENDER_FEMALE = 'female'
    GENDER_OTHER = 'other'
    GENDER_TYPES = (
        (GENDER_MALE, 'male'),
        (GENDER_FEMALE, 'female'),
        (GENDER_OTHER, 'other'),
    )
    username = models.CharField(
        max_length=32,
        unique=True,
    )

    is_staff = models.BooleanField(
        default=False
    )

    is_superuser = models.BooleanField(
        default=False
    )

    first_name = models.CharField(
        max_length=32,
        null=True,
        blank=True
    )

    last_name = models.CharField(
        max_length=32,
        null=True,
        blank=True
    )

    email = models.EmailField(
        max_length=64,
        unique=True
    )

    gender = models.CharField(
        max_length=16,
        choices=GENDER_TYPES,
        null=True,
        blank=True
    )

    phone_number = models.CharField(
        max_length=16,
        null=True,
        blank=True
    )

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'phone_number']

    @property
    def user_type(self):
        user_type = None
        if hasattr(self, 'customer'):
            user_type = 'customer'
        elif hasattr(self, 'seller'):
            user_type = 'seller'
        return user_type

    def create_related_user(self, user_type_module):
        return user_types[user_type_module].objects.create(
            account=self
        )

    class Meta:
        db_table = u'core_account'
