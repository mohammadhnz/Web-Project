from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView


from core.views.account_obtain import AccountTokenObtainPairView
from core.views.user import AccountRegisterAPIView

urlpatterns = [
    path('login/', AccountTokenObtainPairView.as_view()),
    path('login/refresh/', TokenRefreshView.as_view()),
    path('register/', AccountRegisterAPIView.as_view()),
]
