from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class AccountObtainSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, account):
        token = super().get_token(account)
        token['user_type'] = account.user_type
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_type'] = self.user.user_type
        return data



