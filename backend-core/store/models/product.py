from django.db import models
from django.contrib.postgres.fields import HStoreField

from store.models.category import Category
from store.models.shop import Shop
from store.services.utils import generate_uid


class BaseProduct(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    name = models.CharField(max_length=300, unique=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    name = models.CharField(unique=True, max_length=300, editable=False)
    base_product = models.ForeignKey(BaseProduct, on_delete=models.RESTRICT)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    page_url = models.CharField(max_length=500)
    image_url = models.CharField(max_length=500)
    features = HStoreField(null=True, blank=True)
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
    def get_best_product(base_product: BaseProduct) -> Product:
        products = Product.objects.filter(base_product=base_product)
        best_product, best_history = None, None
        for product in products:
            last_history = ProductHistory.get_last_history(product)
            if best_history is None \
                    or (not best_history.is_available and last_history.is_available) \
                    or best_history.price > last_history.price:
                best_history = last_history
                best_product = product
        return best_product

    @staticmethod
    def get_last_history(product: Product):
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
