from django.test import TestCase

from store.models import Product, ProductHistory, Category, Shop, BaseProduct

from tests.data import TestData


class ModelsTestCase(TestCase):
    def test__given_product_and_histories__when_call_get_last_history__then_should_return_correct_history(self):
        # given
        TestData.create_categories()
        TestData.create_shops()

        base = BaseProduct.objects.create(name="redmi-book 15",
                                          category=Category.objects.get(name='لپتاپ شیائومی'))

        product = Product.objects.create(name="redmi-book 15",
                                         base_product=base,
                                         shop=Shop.objects.get(name="دیجیکالا"))
        ProductHistory.objects.create(product=product, price=1000, is_available=True)
        product_history2 = ProductHistory.objects.create(product=product, price=2000, is_available=False)

        # when
        last_history = ProductHistory.get_last_history(product)

        # then
        self.assertEqual(last_history, product_history2)

    def test__given_product_and_histories__when_call_get_previous_history__then_should_return_correct_history(self):
        # given
        TestData.create_categories()
        TestData.create_shops()

        base = BaseProduct.objects.create(name="redmi-book 15",
                                          category=Category.objects.get(name='لپتاپ شیائومی'))

        product = Product.objects.create(name="redmi-book 15",
                                         base_product=base,
                                         shop=Shop.objects.get(name="دیجیکالا"))
        product_history1 = ProductHistory.objects.create(product=product, price=1000, is_available=True)
        product_history2 = ProductHistory.objects.create(product=product, price=2000, is_available=False)
        product_history3 = ProductHistory.objects.create(product=product, price=500, is_available=False)

        # when
        previous_of_product_history1 = product_history1.get_previous_history()
        previous_of_product_history2 = product_history2.get_previous_history()
        previous_of_product_history3 = product_history3.get_previous_history()

        # then
        self.assertEqual(previous_of_product_history1, None)
        self.assertEqual(previous_of_product_history2, product_history1)
        self.assertEqual(previous_of_product_history3, product_history2)

    def test__given_category_tree__when_call_get_all_parents__then_should_return_correct_category_parents(self):
        # given
        Category.objects.create(name="لپتاپ و موبایل", is_leaf=False)
        Category.objects.create(name="لپتاپ", is_leaf=False, parent=Category.objects.get(name='لپتاپ و موبایل'))
        Category.objects.create(name="موبایل", is_leaf=False, parent=Category.objects.get(name='لپتاپ و موبایل'))
        Category.objects.create(name="لپتاپ شیائومی", is_leaf=True, parent=Category.objects.get(name='لپتاپ'))
        Category.objects.create(name="موبایل لمسی", is_leaf=True, parent=Category.objects.get(name='موبایل'))
        leaf = Category.objects.create(name="موبایل قدیمی", is_leaf=True, parent=Category.objects.get(name='موبایل'))

        # when
        category_parents = [category.name for category in leaf.get_all_parents()]

        # then
        self.assertEqual(category_parents, ['موبایل قدیمی', 'موبایل', 'لپتاپ و موبایل'])
