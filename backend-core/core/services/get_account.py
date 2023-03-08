from django.core.exceptions import ValidationError
from rest_framework.generics import get_object_or_404

from core.models import BaseAccount
from core.statics import user_types


def get_seller(user):
    try:
        account = get_object_or_404(BaseAccount, pk=user.pk)
        if account.user_type == user_types.USER_TYPE_SELLER:
            return account.seller
        raise BaseAccount.DoesNotExist()
    except BaseAccount.DoesNotExist:
        raise ValidationError('Seller with this id does not exist!')


def get_customer(user):
    try:
        account = get_object_or_404(BaseAccount, pk=user.pk)
        if account.user_type == user_types.USER_TYPE_CUSTOMER:
            return account.customer
        raise BaseAccount.DoesNotExist()
    except BaseAccount.DoesNotExist:
        raise ValidationError('CUSTOMER with this id does not exist!')
