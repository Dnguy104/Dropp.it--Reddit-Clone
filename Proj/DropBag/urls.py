# from rest_framework import routers
from .api import PostView, ThreadView, CommentView

from django.urls import path
from django.views.decorators.csrf import csrf_exempt

# router = routers.DefaultRouter()
# router.register('api/posts', PostView, 'posts')
#
# urlpatterns = router.urls
urlpatterns = [
    path('api/posts/', csrf_exempt(PostView.as_view()), name='posts'),
    path('api/posts/<int:id>/', csrf_exempt(PostView.as_view()), name='post'),
    path('api/threads/', csrf_exempt(ThreadView.as_view()), name='threads'),
    path('api/threads/<str:thread_name>/', csrf_exempt(ThreadView.as_view()), name='thread'),
    path('api/threads/<str:thread_name>/posts/', csrf_exempt(PostView.as_view()), name='thread_posts'),
    path('api/threads/<str:thread_name>/posts/<int:id>/', csrf_exempt(PostView.as_view()), name='thread_post'),
    path('api/threads/<str:thread_name>/posts/<int:id>/comments/', csrf_exempt(CommentView.as_view()), name='thread_post_comments'),
    path('api/threads/<str:thread_name>/posts/<int:id>/comments/<int:cid>/', csrf_exempt(CommentView.as_view()), name='thread_post_comment'),



]
