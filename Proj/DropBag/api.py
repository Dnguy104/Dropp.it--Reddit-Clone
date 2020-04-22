from DropBag.models import Post
from rest_framework import viewsets, permissions
from .serializers import PostSerializer

#Post ViewSet
class PostViewSet(viewsets.ModelViewSet):
    permission_classes = {
        permissions.IsAuthenticated
    }

    serializer_class = PostSerializer

    def get_queryset(self):
        return self.request.user.posts.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
