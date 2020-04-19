from rest_framework import routers
from .api import PostViewSet

from django.urls import path
from .views import Main, hello

router = routers.DefaultRouter()
router.register('api/posts', PostViewSet, 'posts')

urlpatterns = router.urls