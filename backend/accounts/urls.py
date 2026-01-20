from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import login_view, register, VesselViewSet, PortViewSet, CompanyViewSet, InsurerViewSet

router = DefaultRouter()
router.register(r'vessels', VesselViewSet)
router.register(r'ports', PortViewSet)
router.register(r'companies', CompanyViewSet)
router.register(r'insurers', InsurerViewSet)

urlpatterns = [
    path("login/", login_view, name="api_login"),
    path("register/", register, name="api_register"),
    path("", include(router.urls)),   # 👈 this line adds your API endpoints
]
