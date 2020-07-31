from .views.post import PostView, PostCRView
from .views.thread import ThreadCRView, ThreadView, ThreadSubscribe
from .views.comment import CommentView, CommentCRView
from .views.vote import VoteView
from .views.user import CreateUserView, AuthenticateUser, UserProfile

from django.urls import path
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

# router = routers.DefaultRouter()
# router.register('api/posts', PostView, 'posts')
#
# urlpatterns = router.urls
urlpatterns = [
    path('api/posts/', csrf_exempt(PostCRView.as_view()), name='posts'),
    path('api/posts/<int:p_id>/', csrf_exempt(PostView.as_view()), name='post'),
    path('api/posts/<int:p_id>/comments/', csrf_exempt(CommentCRView.as_view()), name='post'),
    path('api/votes/', csrf_exempt(VoteView.as_view()), name='vote'),
    path('api/comments/', csrf_exempt(CommentCRView.as_view()), name='thread_post_comments'),
    path('api/comments/<int:c_id>/', csrf_exempt(CommentView.as_view()), name='thread_post_comment'),
    path('api/threads/<int:t_id>/', csrf_exempt(ThreadView.as_view()), name='thread'),

    path('api/threads/', csrf_exempt(ThreadCRView.as_view()), name='threads'),
    path('api/threads/<int:t_id>/posts/', csrf_exempt(PostCRView.as_view()), name='thread_posts'),
    path('api/threads/<int:t_id>/posts/<int:p_id>/comments/', csrf_exempt(CommentCRView.as_view()), name='comment_create'),

    # path('api/user/<int:u_id>/threads/', csrf_exempt(ThreadSubscribe.as_view()), name='thread_sub'),

    url(r'api/user/<int:u_id>/threads/', csrf_exempt(ThreadCRView.as_view()), name='userthread'),
    url(r'api/user/', csrf_exempt(UserProfile.as_view()), name='loaduser'),
    url(r'api/register/', csrf_exempt(CreateUserView.as_view()), name='user'),
    url(r'api/login/', csrf_exempt(AuthenticateUser.as_view()), name='userauth'),
]
