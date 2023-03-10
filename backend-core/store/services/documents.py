from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import Q

from store.serializers.dtos import ProductListQuery, FeatureDTO
from store.models import Product, ProductHistory, Category, BaseProduct


@registry.register_document
class ProductDocument(Document):
    categories = fields.NestedField(required=True, properties={
        'name': fields.TextField(),
        'id': fields.IntegerField(),
    })
    last_history = fields.ObjectField(required=True, properties={
        'min_price': fields.IntegerField(),
        'is_available': fields.BooleanField(),
        'created_at': fields.DateField(),
    })
    shop_count = fields.IntegerField(required=True)
    image_url = fields.TextField()
    features = fields.NestedField(required=False, properties={
        'name': fields.TextField(),
        'value': fields.TextField(),
    })

    class Index:
        name = 'products'
        settings = {'number_of_shards': 1, 'number_of_replicas': 0}

    class Django:
        model = BaseProduct
        fields = ['name', 'uid']
        ignore_signals = True

    @staticmethod
    def prepare_last_history(base_product):
        product = ProductHistory.get_best_product(base_product)
        last_history = ProductHistory.get_last_history(product)
        return {
            'min_price': last_history.price,
            'is_available': last_history.is_available,
            'created_at': last_history.created_at,
        }

    @staticmethod
    def prepare_shop_count(base_product):
        return len(Product.objects.filter(base_product=base_product))

    @staticmethod
    def prepare_categories(base_product):
        categories = Category.get_all_parents(base_product.category)
        return [{
            'id': category.id,
            'name': category.name,
        } for category in categories]

    @staticmethod
    def prepare_image_url(base_product: BaseProduct):
        product = ProductHistory.get_best_product(base_product)
        return product.image_url

    @staticmethod
    def prepare_features(base_product: BaseProduct):
        product = ProductHistory.get_best_product(base_product)
        return [x.dict() for x in FeatureDTO.construct_features(product.features)]

    @staticmethod
    def create_query(query: ProductListQuery):
        search = ProductDocument().search()
        for f in query.filters:
            search = search.filter(f[0], **f[1])
        if query.category_id:
            search = search.query(
                'nested',
                path='categories',
                query=Q('term', categories__id=query.category_id)
            )
        if search.sort is None:
            return search
        return search.sort(query.sort)
