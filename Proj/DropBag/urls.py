# from rest_framework import routers
from .api import PostCRView, ThreadCRView, CommentCRView
from .api import PostView, CommentView, ThreadView

from django.urls import path
from django.views.decorators.csrf import csrf_exempt

# router = routers.DefaultRouter()
# router.register('api/posts', PostView, 'posts')
#
# urlpatterns = router.urls
urlpatterns = [
    path('api/posts/', csrf_exempt(PostCRView.as_view()), name='posts'),
    path('api/posts/<int:p_id>/', csrf_exempt(PostView.as_view()), name='post'),
    path('api/comments/', csrf_exempt(CommentCRView.as_view()), name='thread_post_comments'),
    path('api/comments/<int:c_id>/', csrf_exempt(CommentView.as_view()), name='thread_post_comment'),
    path('api/threads/<int:t_id>/', csrf_exempt(ThreadView.as_view()), name='thread'),

    path('api/threads/', csrf_exempt(ThreadCRView.as_view()), name='threads'),
    path('api/threads/<int:t_id>/posts/', csrf_exempt(PostCRView.as_view()), name='thread_posts'),
    path('api/threads/<int:t_id>/posts/<int:p_id>/comments/', csrf_exempt(CommentCRView.as_view()), name='thread_post'),



]
