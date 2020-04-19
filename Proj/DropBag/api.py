from DropBag.models import Post
from rest_framework import viewsets, permissions
from .serializers import PostSerializer

#Post ViewSet
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    permission_classes = {
        permissions.AllowAny
    }
    serializer_class = PostSerializer