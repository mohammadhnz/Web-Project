import json

from django.test import TestCase
from django.test import Client

from store.models import Category


class ViewsTestCase(TestCase):
    def test__given_category_list__when_client_calls_category_list_api__then_should_return_correct_length_and_urls(
            self):
        # given
        Category.objects.create(name="لپتاپ و موبایل", is_leaf=False)
        Category.objects.create(name="لپتاپ", is_leaf=False, parent=Category.objects.get(name='لپتاپ و موبایل'))
        Category.objects.create(name="موبایل", is_leaf=False, parent=Category.objects.get(name='لپتاپ و موبایل'))
        Category.objects.create(name="لپتاپ شیائومی", is_leaf=True, parent=Category.objects.get(name='لپتاپ'))
        Category.objects.create(name="موبایل لمسی", is_leaf=True, parent=Category.objects.get(name='موبایل'))
        Category.objects.create(name="موبایل قدیمی", is_leaf=True, parent=Category.objects.get(name='موبایل'))
        Category.objects.create(name="موبایل ترکیبی", is_leaf=True, parent=Category.objects.get(name='موبایل'))

        # when
        client = Client()
        response = client.get('/category/list', {
            'page': 2,
            'size': 3,
        })
        body = json.loads(response._container[0])

        # then
        self.assertEqual(response.status_code, 200)
        self.assertEqual(body, {
            'next': 'http://testserver/category/list?page=3&size=3',
            'prev': 'http://testserver/category/list?page=1&size=3',
            'count': 7,
            'items': [
                {'id': 4, 'name': 'لپتاپ شیائومی', 'parent_id': 2},
                {'id': 5, 'name': 'موبایل لمسی', 'parent_id': 3},
                {'id': 6, 'name': 'موبایل قدیمی', 'parent_id': 3}
            ]
        })
