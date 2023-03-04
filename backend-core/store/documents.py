from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from .dtos import ProductListQuery
from .models import Product, ProductHistory, Category


@registry.register_document
class ProductDocument(Document):
    categories = fields.NestedField(required=True, properties={
        'name': fields.TextField(),
        'id': fields.IntegerField(),
    })
    last_history = fields.ObjectField(required=True, properties={
        'price': fields.IntegerField(),
        'is_available': fields.BooleanField(),
        'created_at': fields.DateField(),
    })
    shop = fields.ObjectField(required=True, properties={
        'name': fields.TextField(),
    })

    class Index:
        name = 'products'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

    class Django:
        model = Product
        fields = ['name', 'uid']
        ignore_signals = True

    @staticmethod
    def prepare_last_history(product):
        last_history = ProductHistory.get_last_history(product)
        return {
            'price': last_history.price,
            'is_available': last_history.is_available,
            'created_at': last_history.created_at,
        }

    @staticmethod
    def prepare_categories(product):
        categories = Category.get_all_parents(product.category)
        return [{
            'id': category.id,
            'name': category.name,
        } for category in categories]

    @staticmethod
    def create_query(query: ProductListQuery):
        search = ProductDocument().search()
        for f in query.filters:
            search = search.filter(f[0], **f[1])
        return search.sort(query.sort)
