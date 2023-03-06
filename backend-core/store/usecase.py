from elasticsearch_dsl import Q

from store.documents import ProductDocument
from store.dtos import ProductListQuery
from store.models import Category, BaseProduct


def find_phrase_score(phr, name: str, features: dict):
    score = 0
    if name.find(phr) != -1:
        score += 10

    for key in features:
        if key != 'general_features' and key in features and features.get(key) is not None and features.get(key).find(
                phr) != -1:
            score += 3
    return score


def calculate_score(category, name: str, features: dict):
    score = 10 * find_phrase_score(category.name, name, features)

    for word in category.related_words:
        if name.find(category.name) != -1:
            score += int(category.related_words.get(word)) * find_phrase_score(word, name, features)
    return score


def suggest_category(name: str, features: dict):
    categories = Category.objects.filter(is_leaf=True)

    max_score, best_id = None, None
    for category in categories:
        score = calculate_score(category, name, features)
        if max_score is None or score > max_score:
            max_score, best_id = score, category.id
    return best_id


def suggest_base_product(name: str, features: dict, category_id, price):
    query = ProductListQuery({
        'price__gt': price * 0.7,
        'price__lt': price * 1.3,
        'category_id': category_id,
    })
    query.filters.append(('fuzzy', {'name': {"value": name}}))

    products = ProductDocument.create_query(query).execute()
    return products[0].uid


def get_or_select_base_product(name: str, category_id, features: dict, price):
    print(name, category_id, price)
    products = run_query(name, category_id, price * 1.3, price * 0.7)
    if len(products) > 0:
        base = [c for c in BaseProduct.objects.filter(uid=products[0].uid)][0]
        return base

    category = [c for c in Category.objects.filter(id=category_id)][0]
    return BaseProduct.objects.create(name=name, category=category)


def run_query(query: str, category_id, price__lt, price__gt, result_count: int = 1):
    search = ProductDocument.search()
    search = search.query(Q('bool',
                            should=[_get_match_query("name", query),
                                    {'term': {'categories__id': category_id}},
                                    {'term': {'price__lt': price__lt}},
                                    {'term': {'price__gt': price__gt}}],
                            minimum_should_match=1))
    results = search.execute()[:result_count]
    return results


def _get_match_query(field, value):
    return {
        "match": {
            field: {
                "query": value,
                "operator": "and",
                "fuzziness": "AUTO"
            }
        }
    }
