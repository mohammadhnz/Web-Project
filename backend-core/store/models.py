from django.db import models
from django.contrib.postgres.fields import HStoreField
from .utils import generate_uid


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.RESTRICT)
    is_leaf = models.BooleanField()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name

    def get_all_parents(self):
        result = [self]
        current = self
        while current.parent is not None:
            result.append(current.parent)
            current = current.parent
        return result


class Shop(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    name = models.CharField(max_length=50, unique=True)
    domain = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    name = models.CharField(max_length=50, unique=True)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    page_url = models.CharField(max_length=200)
    features = HStoreField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class ProductHistory(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='history')
    price = models.IntegerField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    @staticmethod
    def get_last_history(product):
        last_history = ProductHistory.objects.filter(product=product).order_by('-created_at')[:1]
        if len(last_history) == 0:
            return None
        return last_history[0]

    def get_previous_history(self):
        last_history = ProductHistory.objects.filter(
            product=self.product,
            created_at__lt=self.created_at
        ).order_by('-created_at')[:1]
        if len(last_history) == 0:
            return None
        return last_history[0]
