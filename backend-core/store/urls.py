from django.urls import path, re_path
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    path('category/list', views.CategoryList.as_view(), name='product_price_change'),
    path('nested_categories/list', views.NestedCategoriesListView.as_view(), name='nested_categories_list_view'),
    path('product/list', views.ProductList.as_view(), name='product_get_list'),
    path('product/detail/<str:uid>', views.get_product, name='product_get'),
    path('product/create-or-update', csrf_exempt(views.CreateOrUpdate.as_view()), name='product_create_or_update'),
    path('product/redirect', views.Redirect.as_view(), name='product_redirect'),
    path('product/price-change/list', views.PriceChange.as_view(), name='product_price_change'),
]
