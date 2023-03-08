from rest_framework_simplejwt.views import TokenObtainPairView
from core.serializers.account_obtain import AccountObtainSerializer


class AccountTokenObtainPairView(TokenObtainPairView):
    serializer_class = AccountObtainSerializer
