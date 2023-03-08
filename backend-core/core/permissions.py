from rest_framework import permissions

from core import repository, exceptions
from core.services import get_account


class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            get_account.get_seller(request.user)
            return True
        except:
            return False


class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            get_account.get_customer(request.user)
            return True
        except:
            return False
