from django.contrib import admin

from .models import Category, Shop, Product, BaseProduct


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'parent')
    list_editable = ('name',)


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ('domain', 'name')
    list_editable = ('name',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('uid', 'name', 'base_product')
    list_editable = ('base_product',)
    search_fields = ('name', )


@admin.register(BaseProduct)
class BaseProductAdmin(admin.ModelAdmin):
    list_display = ('uid', 'name', 'category')
    list_editable = ('name',)
    search_fields = ('name', )
