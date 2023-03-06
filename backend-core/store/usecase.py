from store.documents import ProductDocument
from store.dtos import ProductListQuery
from store.models import Category


def find_phrase_score(phr, name: str, features: dict):
    score = 0
    if name.find(phr) != -1:
        score += 10

    for key, value in features:
        if value.find(phr) != -1:
            score += 3
    return score


def calculate_score(category, name: str, features: dict):
    score = 10 * find_phrase_score(category.name, name, features)

    for word, zrb in category.related_words:
        if name.find(category.name) != -1:
            score += zrb * find_phrase_score(word, name, features)
    return score


def suggest_category(name: str, features: dict):
    categories = Category.objects.all()

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
    print(products)
    return products[0].uid