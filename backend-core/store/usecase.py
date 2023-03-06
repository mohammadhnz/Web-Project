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
