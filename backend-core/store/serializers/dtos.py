import json
from dataclasses import dataclass, asdict
from datetime import datetime
from typing import List, Optional, Dict

from django import forms

from store.models import ProductHistory, Category, Product, BaseProduct


class ProductCreateOrUpdateForm(forms.Form):
    page_url = forms.CharField(max_length=300, required=True)
    image_url = forms.CharField(max_length=300, required=True)
    shop_domain = forms.CharField(max_length=200, required=True)
    name = forms.CharField(max_length=300, required=True)
    price = forms.IntegerField(required=True)
    is_available = forms.BooleanField(required=False, initial=False)
    features = forms.CharField(required=True)

    def product_fields(self):
        data = self.cleaned_data
        return {'name': data.get('name'),
                'page_url': data.get('page_url'),
                'image_url': data.get('image_url'),
                'features': json.loads(data.get('features')),
                'shop': self.shop,
                'base_product': self.base_product}

    def product_history_fields(self):
        data = self.cleaned_data
        return {'product': self.product,
                'price': data.get('price'),
                'is_available': data.get('is_available')}

    def shop_fields(self):
        data = self.cleaned_data
        return {'domain': data.get('shop_domain')}


@dataclass
class DataClass:
    def dict(self):
        return asdict(self)


@dataclass
class ProductPriceChangeItemDTO(DataClass):
    old_price: str
    new_price: str
    old_availability: Optional[bool]
    new_availability: bool
    price_change_time: str

    def __init__(self, old_item: ProductHistory, new_item: ProductHistory):
        if old_item is None:
            self.old_price = '- تومان'
            self.old_availability = None
        else:
            self.old_price = '{} تومان'.format(old_item.price)
            self.old_availability = old_item.is_available
        self.new_price = '{} تومان'.format(new_item.price)
        self.new_availability = new_item.is_available
        self.price_change_time = '{} دقیقه پیش'.format(
            int((datetime.now() - new_item.created_at.replace(tzinfo=None)).total_seconds() // 60))


@dataclass
class ProductPriceChangeListDTO(DataClass):
    items: List[ProductPriceChangeItemDTO]

    def __init__(self, product_histories):
        self.items = []
        for i in range(1, len(product_histories)):
            self.items.append(ProductPriceChangeItemDTO(product_histories[i - 1], product_histories[i]))


@dataclass
class CategoryItemDTO(DataClass):
    id: int
    name: str
    parent_id: Optional[int]

    def __init__(self, category: Category):
        self.id = category.id
        self.name = category.name
        self.parent_id = category.parent and category.parent.id


@dataclass
class ProductShopDTO(DataClass):
    uid: str
    product_redirect_url: str
    product_price_list_url: str
    shop_name: str
    name: str
    price: str
    is_available: bool
    updated: str

    def __init__(self, product: Product):
        self.redirect_url = '/product/redirect/?uid={}'.format(product.uid)
        self.name = product.shop.name
        self.city = product.shop.city
        history = ProductHistory.get_last_history(product)
        self.price = history.price
        self.is_available = history.is_available


@dataclass
class FeatureDTO(DataClass):
    name: str
    value: str

    def __init__(self, name: str, value: str):
        self.name = name
        self.value = value

    @staticmethod
    def construct_features(features: Dict) -> List:
        result = []
        for name in features:
            result.append(FeatureDTO(name, features[name]))
        return result


@dataclass
class ProductDetailItemDTO(DataClass):
    uid: str
    product_redirect_url: str
    product_price_list_url: str
    shop_name: str
    name: str
    price: str
    is_available: bool
    updated: str
    features: List[FeatureDTO]

    def __init__(self, base_product: BaseProduct, available_products: List[Product]):
        product = ProductHistory.get_best_product(base_product)
        last_history = ProductHistory.get_last_history(product)

        self.uid = base_product.uid
        self.product_price_list_url = '/product/price-change/list/?uid={}'.format(base_product.uid)
        self.product_image_url = product.image_url
        self.shops = sorted([ProductShopDTO(product) for product in available_products], key=lambda x: x.price)
        self.best_price_redirect_url = '/product/redirect/?uid={}'.format(product.uid)

        self.name = base_product.name
        self.price = last_history.price
        self.is_available = last_history.is_available
        self.updated = last_history.created_at
        self.features = FeatureDTO.construct_features(product.features)


@dataclass
class ProductListItemDTO(DataClass):
    product_url: str
    product_image_url: str
    shop_count: int
    name: str
    price: str
    is_available: bool
    updated: str
    category_id: int

    def __init__(self, product):
        self.product_url = '/product/detail/{}'.format(product.uid)
        self.product_image_url = product.image_url
        self.shop_count = product.shop_count
        self.name = product.name
        self.price = product.last_history.min_price
        self.is_available = product.last_history.is_available
        self.updated = product.last_history.created_at
        self.category_id = product.categories[0]['id']


@dataclass
class ProductListQuery(DataClass):
    filters: List[tuple]
    sort: dict
    category_id: int

    def __init__(self, query):
        self.filters = []
        price__lt = query.get('price__lt', None)
        price__gt = query.get('price__gt', None)
        if price__lt is not None or price__gt is not None:
            range_query = {}
            if price__lt is not None:
                range_query['lt'] = int(price__lt)
            if price__gt is not None:
                range_query['gt'] = int(price__gt)
            self.filters.append(('range', {'last_history__min_price': range_query}))
        name = query.get('name', None)

        if name is not None:
            self.filters.append(
                (
                    'bool',
                    {
                        "should": [
                            self._get_match_query("name", name),
                            self._get_match_query("features.name", name),
                            self._get_match_query("features.value", name),
                        ],
                        "minimum_should_match": 1
                    }
                )
            )

        is_available = query.get('is_available', None)
        if is_available is not None:
            self.filters.append(('term', {'last_history__is_available': is_available}))
        category_id = query.get('category_id', None)
        self.category_id = int(category_id) if category_id else None

        sort = query.get('sort', 'date_updated-')
        if sort.startswith('date_updated'):
            self.sort = {"last_history.created_at": {"order": "desc" if sort[-1] == '-' else "asc"}}
        if sort.startswith('price'):
            self.sort = {"last_history.price": {"order": "desc" if sort[-1] == '-' else "asc"}}

    def _get_match_query(self, field, value):
        return {
            "match": {
                field: {
                    "query": value,
                    "operator": "and",
                    "fuzziness": "AUTO"
                }
            }
        }
