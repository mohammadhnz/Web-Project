import datetime

from django.test import TestCase

from store.models import Product, ProductHistory, Category, Shop
from store.dtos import ProductListQuery

from tests.data import TestData

from store.documents import ProductDocument

from store.dtos import ProductItemDTO, ProductPriceChangeListDTO


class DataTransferObjectsTestCase(TestCase):
    def test__given_product_list_params__when_create_instance__then_should_create_correct_elasticsearch_query_1(self):
        # given
        query_params = {
            'page': 4,
            'price__gt': 10000,
            'price__lt': 20000,
            'is_available': False,
            'sort': 'price'
        }

        # when
        elastic_search_query = ProductListQuery(query_params).dict()

        # then
        self.assertEqual(elastic_search_query, {
            'filters': [
                ('range', {'last_history__price': {'lt': 20000, 'gt': 10000}}),
                ('term', {'last_history__is_available': False})
            ],
            'sort': {'last_history.price': {'order': 'asc'}}
        })

    def test__given_product_list_params__when_create_instance__then_should_create_correct_elasticsearch_query_2(self):
        # given
        query_params = {
            'price__gt': 10000,
            'is_available': False,
            'category_id': 34,
        }

        # when
        elastic_search_query = ProductListQuery(query_params).dict()

        # then
        self.assertEqual(elastic_search_query, {
            'filters': [
                ('range', {'last_history__price': {'gt': 10000}}),
                ('term', {'last_history__is_available': False}),
                ('term', {'categories__id': 34})
            ],
            'sort': {'last_history.created_at': {'order': 'desc'}}
        })

    def test__given_product_document__when_create_dto_instance__then_should_return_correct_dataclass(self):
        # given
        document = ProductDocument(
            name='redmi-book 14', uid='e1234567890',
            last_history={'price': 1000, 'is_available': False, 'created_at': datetime.datetime(2022, 10, 1, 1)},
            shop={'name': 'دیجیکالا'},
        )

        # when
        response = ProductItemDTO(document).dict()

        # then
        self.assertEqual(response, {
            'uid': 'e1234567890',
            'product_redirect_url': '/product/redirect/?uid=e1234567890',
            'product_price_list_url': '/product/price-change/list/?uid=e1234567890',
            'shop_name': 'دیجیکالا', 'name': 'redmi-book 14', 'price': 1000,
            'is_available': False,
            'updated': datetime.datetime(2022, 10, 1, 1)
        })

    def test__given_product_history__when_create_dto_instance__then_should_return_correct_dataclass(self):
        # given
        TestData.create_categories()
        TestData.create_shops()
        product = Product.objects.create(name="redmibook 14 pro",
                                         category=Category.objects.get(name='لپتاپ شیائومی'),
                                         shop=Shop.objects.get(name="دیجیکالا"))
        product_history1 = ProductHistory.objects.create(product=product, price=10, is_available=True,
                                                         created_at=datetime.datetime(2020, 6, 10))
        product_history2 = ProductHistory.objects.create(product=product, price=100, is_available=False,
                                                         created_at=datetime.datetime(2022, 10, 10))
        product_history3 = ProductHistory.objects.create(product=product, price=1000, is_available=True,
                                                         created_at=datetime.datetime(2022, 11, 10))

        # when
        response = ProductPriceChangeListDTO([
            None,
            product_history1,
            product_history2,
            product_history3
        ]).dict()['items']

        # then
        self.assertEqual(len(response), 3)
        self.assertEqual(response[0]['old_price'], '- تومان')
        self.assertEqual(response[0]['new_price'], '10 تومان')
        self.assertEqual(response[0]['old_availability'], None)
        self.assertEqual(response[0]['new_availability'], True)

        self.assertEqual(response[1]['old_price'], '10 تومان')
        self.assertEqual(response[1]['new_price'], '100 تومان')
        self.assertEqual(response[1]['old_availability'], True)
        self.assertEqual(response[1]['new_availability'], False)

        self.assertEqual(response[2]['old_price'], '100 تومان')
        self.assertEqual(response[2]['new_price'], '1000 تومان')
        self.assertEqual(response[2]['old_availability'], False)
        self.assertEqual(response[2]['new_availability'], True)
