from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import QuerySet
from ..serializers import PostSerializer, ThreadSerializer, CommentSerializer
from ..models import Post, Thread, Comment
from .api import GenericAPIView

#Comment ViewSet
class CommentCRView(CreateModelMixin,
               ListModelMixin,
               GenericAPIView):

    serializer_class = CommentSerializer
    model = Comment

    def get(self, request, *args, **kwargs):
        print("get ", kwargs, args)
        return self.list(request, args, kwargs)

    def post(self, request, *args, **kwargs):
        print("post ", kwargs, args)
        return self.create(request, args, kwargs)

#Comment ViewSet
class CommentView(RetrieveModelMixin,
               UpdateModelMixin,
               DestroyModelMixin,
               GenericAPIView):

    serializer_class = CommentSerializer
    model = Comment

    def validate(self, serializer, *args, **kwargs):
        super(CommentView, self).validate(serializer)
        if self.is_valid:
            print("valid ", kwargs, args)

    def dispatch(self, request, *args, **kwargs):
       self.pk_url_kwarg = "c_id"
       return super(CommentView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        print("get ", kwargs, args)
        return self.retrieve(request, args, kwargs)

    def delete(self, request, *args, **kwargs):
        print("delete ", kwargs, args)
        self.destroy(request, args, kwargs)
        return JsonResponse(self.data, status=self.status)

    def put(self, request, *args, **kwargs):
        print("put ", kwargs, args)
        self.request = self.parse_request(request);
        self.get_update(request, args, kwargs)
        serializer = self.get_serializer(instance, data=self.request, partial=partial)
        self.validate(serializer)
        if self.is_valid:
            self.perform_update(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)
