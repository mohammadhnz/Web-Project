from store.models import Product, ProductHistory, Category, Shop


class TestData:
    @staticmethod
    def create_categories():
        Category.objects.create(name="لپتاپ و موبایل", is_leaf=False)
        Category.objects.create(name="لپتاپ", is_leaf=False, parent=Category.objects.get(name='لپتاپ و موبایل'))
        Category.objects.create(name="لپتاپ شیائومی", is_leaf=True, parent=Category.objects.get(name='لپتاپ'))

    @staticmethod
    def create_shops():
        Shop.objects.create(name="دیجیکالا", domain='digikala.com')
        Shop.objects.create(name="کافه ربات", domain='thecaferobot.com')
