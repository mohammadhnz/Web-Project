from rest_framework import response, status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from core.serializers.account import AccountBaseSerializer, AccountRegisterSerializer


class AccountRegisterAPIView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = AccountBaseSerializer

    def get_object(self):
        return self.request.user

    def create(self, request, *args, **kwargs):
        serializer = AccountRegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return response.Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        data = serializer.get_cleaned_data()
        instance = self.get_serializer_class()(data=data)
        instance.is_valid(raise_exception=True)
        account = instance.save()
        return Response(data=self.get_serializer_class()(instance=account).data, status=status.HTTP_201_CREATED)
