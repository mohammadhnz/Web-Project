from django.db import models
from django.contrib.postgres.fields import HStoreField
from .utils import generate_uid


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.RESTRICT)
    is_leaf = models.BooleanField()
    related_words = HStoreField(null=True, blank=True)

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
    city = models.CharField(max_length=50, unique=True)
    domain = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class BaseProduct(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    name = models.CharField(max_length=50, unique=True)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    uid = models.CharField(primary_key=True, max_length=11, default=generate_uid, editable=False)
    base_product = models.ForeignKey(BaseProduct, on_delete=models.RESTRICT)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    page_url = models.CharField(max_length=200)
    image_url = models.CharField(max_length=300)
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
    def get_last_history(product: Product) -> ProductHistory:
        last_history = ProductHistory.objects.filter(product=product).order_by('-created_at')[:1]
        if len(last_history) == 0:
            return None
        return last_history[0]

    def get_previous_history(self) -> ProductHistory:
        last_history = ProductHistory.objects.filter(
            product=self.product,
            created_at__lt=self.created_at
        ).order_by('-created_at')[:1]
        if len(last_history) == 0:
            return None
        return last_history[0]
