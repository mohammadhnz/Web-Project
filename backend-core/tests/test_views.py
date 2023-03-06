import json

from django.test import TestCase
from django.test import Client

from store.models import Category


class ViewsTestCase(TestCase):
    def test__given_category_list__when_client_calls_category_list_api__then_should_return_correct_length_and_urls(
            self):
        # given
        Category.objects.create(id=5, name="لپتاپ و موبایل", is_leaf=False)
        Category.objects.create(name="لپتاپ", is_leaf=False, parent=Category.objects.get(name='لپتاپ و موبایل'))
        Category.objects.create(name="موبایل", is_leaf=False, parent=Category.objects.get(name='لپتاپ و موبایل'))
        Category.objects.create(name="لپتاپ شیائومی", is_leaf=True, parent=Category.objects.get(name='لپتاپ'))
        Category.objects.create(name="موبایل لمسی", is_leaf=True, parent=Category.objects.get(name='موبایل'))
        Category.objects.create(name="موبایل قدیمی", is_leaf=True, parent=Category.objects.get(name='موبایل'))
        Category.objects.create(name="موبایل ترکیبی", is_leaf=True, parent=Category.objects.get(name='موبایل'))

        # when
        client = Client()
        response = client.get('/category/list')
        body = json.loads(response._container[0])

        # then
        self.assertEqual(response.status_code, 200)
        self.assertEqual(body, {
            'next': None,
            'prev': None,
            'count': 1,
            'items': [
                {'id': 5, 'name': 'لپتاپ و موبایل', 'parent_id': None},
            ]
        })
