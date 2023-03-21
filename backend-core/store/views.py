import json
from collections import defaultdict

from django.conf import settings
from django.http import HttpResponseBadRequest
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.generic.base import RedirectView, TemplateView
from django.views.generic.edit import BaseFormView
from django.views.generic.list import BaseListView

from store.serializers.dtos import ProductCreateOrUpdateForm, ProductPriceChangeListDTO, CategoryItemDTO, \
    ProductListItemDTO, ProductListQuery, ProductDetailItemDTO
from store.models import ProductHistory, Category, Product, Shop, BaseProduct
from store.services.documents import ProductDocument
from store.services.usecase import suggest_category, get_or_select_base_product
from store.services.utils import replace_query


class ListView(BaseListView):
    def get_paginate_by(self, queryset):
        return self.request.GET.get('size', 20)

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
        form.shop = Shop.objects.filter(domain=data.get('shop_domain')).first()
        if form.shop is None:
            print("WHAT THE FUCK?   ", data.get('shop_domain'))
            return HttpResponseBadRequest()
        form.shop = get_object_or_404(Shop, domain=data.get('shop_domain'))
        form.category_id = suggest_category(data.get('name'), json.loads(data.get('features')))
        form.base_product = get_or_select_base_product(data.get('name'),
                                                       form.category_id,
                                                       json.loads(data.get('features')),
                                                       data.get('price'))
        form.product, _ = Product.objects.update_or_create(name=data.get('name'), defaults=form.product_fields())
        ProductHistory.objects.create(**form.product_history_fields())
        # ProductDocument().update(form.base_product)
        return JsonResponse({"uid": form.product.uid})

    def form_invalid(self, form):
        return JsonResponse({"error": "Validation Error", "description": form.errors}, status=400)


class Redirect(RedirectView):
    def get_redirect_url(self):
        product = get_object_or_404(Product, uid=self.request.GET.get('uid', None))
        return product.page_url


class CategoryList(ListView):
    queryset = Category.objects.filter(parent__isnull=True).all()

    def get_items(self, context):
        return [CategoryItemDTO(c).dict() for c in context['object_list']]


class NestedCategoriesListView(ListView):
    queryset = Category.objects.filter(parent__isnull=True).all()

    def get_items(self, context):
        parent_categories = context['object_list']
        all_categories = Category.objects.all()
        parents_map = defaultdict(set)
        categories_data = {c.id: CategoryItemDTO(c).dict() for c in all_categories}
        for category_id, category in categories_data.items():
            category['link'] = settings.BASE_URL + f"/product/list?category_id={category_id}"
        for category in all_categories:
            parents_map[category.parent_id].add(category.id)

        total_data = []
        for category in parent_categories:
            data = categories_data[category.id]
            ct1s = parents_map[category.id]
            ct1_data = []
            for cid in ct1s:
                ct2s = parents_map[cid]
                c1_data = categories_data[cid]
                c1_data['children'] = [c for c_id, c in categories_data.items() if c_id in ct2s]
                ct1_data.append(c1_data)
            data['children'] = ct1_data
            total_data.append(data)
        return total_data


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
        print(self.request.GET)
        return [ProductListItemDTO(x).dict() for x in context['object_list']]


def get_product(request, uid):
    base_product = get_object_or_404(BaseProduct, uid=uid)
    products = Product.objects.filter(base_product=base_product)
    return JsonResponse(data=ProductDetailItemDTO(base_product, products).dict())


# base_product = BaseProduct.objects.filter(uid="RbQeXUBgPeN").first()
# for bp_uid in ["XYGapsADNys", "kbGgpqNgn8J", "HQbgzMTfZvC", "ddZrZe3X2Nh", "34BQFNkA5SL"]:
#     try:
#         pr_base = BaseProduct.objects.filter(uid=bp_uid).first()
#         pr = Product.objects.filter(base_product=pr_base).first()
#         pr.base_product = base_product
#         pr.save()
#     except Exception as e:
#         print(bp_uid)
#
for base_product in BaseProduct.objects.all():
    if Product.objects.filter(base_product=base_product).count() == 0:
        base_product.delete()

# ProductHistory.objects.filter(price=-1).update(price=0, is_available=False)