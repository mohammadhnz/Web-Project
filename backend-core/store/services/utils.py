import shortuuid
from werkzeug.urls import url_encode


def replace_query(request, param, value):
    params = request.GET.copy()
    params[param] = value
    return '{}?{}'.format(request.path, url_encode(params))


def generate_uid():
    return shortuuid.ShortUUID().random(length=11)
