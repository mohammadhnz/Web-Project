from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('category/list', views.CategoryList.as_view(), name='product_price_change'),
    path('product/list', views.ProductList.as_view(), name='product_get_list'),
    path('product/create-or-update', csrf_exempt(views.CreateOrUpdate.as_view()), name='product_create_or_update'),
    path('product/redirect', views.Redirect.as_view(), name='product_redirect'),
    path('product/price-change/list', views.PriceChange.as_view(), name='product_price_change'),
]
