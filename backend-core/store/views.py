import json

import environ
from django.views.generic.edit import BaseFormView
from django.views.generic.base import RedirectView
from django.views.generic.list import BaseListView
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .documents import ProductDocument
from .dtos import ProductCreateOrUpdateForm, ProductPriceChangeListDTO, CategoryItemDTO, ProductListItemDTO, \
    ProductListQuery
from .models import ProductHistory, Category, Product, Shop, BaseProduct
from .usecase import suggest_category, suggest_base_product
from .utils import replace_query

env = environ.Env()


class ListView(BaseListView):
    def get_paginate_by(self, queryset):
        return self.request.GET.get('size', 10)

    def get_url_on_page(self, page):
        return self.request.build_absolute_uri(replace_query(self.request, 'page', page))

    def get_current_page(self):
        return int(self.request.GET.get('page', 1))

    def get_prev_url(self, page_obj):
        if page_obj.number == 1:
            return None
        return self.get_url_on_page(page_obj.number - 1)

    def get_next_url(self, page_obj):
        if page_obj.number == page_obj.paginator.num_pages:
            return None
        return self.get_url_on_page(page_obj.number + 1)

    def render_to_response(self, context):
        return JsonResponse({'next': self.get_next_url(context['page_obj']),
                             'prev': self.get_prev_url(context['page_obj']),
                             'count': context['paginator'].count,
                             'items': self.get_items(context)})

    def get_items(self, context):
        pass


class CreateOrUpdate(BaseFormView):
    http_method_names = ['post']
    form_class = ProductCreateOrUpdateForm

    def form_valid(self, form):
        data = form.cleaned_data
        form.shop = get_object_or_404(Shop, domain=data.get('shop_domain'))
        form.category_id = suggest_category(data.get('name'), json.loads(data.get('features')))
        print("result cat", form.category_id)
        """form.base_product_id = suggest_base_product(data.get('name'),
                                                    json.loads(data.get('features')),
                                                    data.get('category_id'),
                                                    data.get('price'))
        """
        x = [rr for rr in Category.objects.filter(id=form.category_id)][0]
        form.base_product = BaseProduct.objects.create(name=data.get('name'),
                                                       category=x)
        form.product, _ = Product.objects.update_or_create(name=data.get('name'), defaults=form.product_fields())
        ProductHistory.objects.create(**form.product_history_fields())
        ProductDocument().update(form.base_product)
        return JsonResponse({"uid": form.product.uid})

    def form_invalid(self, form):
        return JsonResponse({"error": "Validation Error", "description": form.errors}, status=400)


class Redirect(RedirectView):
    def get_redirect_url(self):
        shop = get_object_or_404(Product, uid=self.request.GET.get('uid', None)).shop
        return 'https://{}'.format(shop.domain)


class CategoryList(ListView):
    queryset = Category.objects.all()

    def get_items(self, context):
        return [CategoryItemDTO(c).dict() for c in context['object_list']]


class PriceChange(ListView):
    def get_queryset(self):
        return ProductHistory.objects.filter(product=self.request.GET['uid'])

    def get_items(self, context):
        result = [context['object_list'][0].get_previous_history()] + [item for item in context['object_list']]
        return ProductPriceChangeListDTO(result).dict()['items']


class ProductList(ListView):
    def get_queryset(self):
        return ProductDocument.create_query(ProductListQuery(self.request.GET)).execute()

    def get_items(self, context):
        return [ProductListItemDTO(x).dict() for x in context['object_list']]
