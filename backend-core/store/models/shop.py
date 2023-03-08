from django.db import models

from store.services.utils import generate_uid


class Shop(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    name = models.CharField(max_length=100, unique=True)
    city = models.CharField(max_length=50)
    domain = models.CharField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
