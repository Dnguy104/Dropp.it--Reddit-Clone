# from .mixins import mixins
from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import QuerySet
from ..serializers import PostSerializer, ThreadSerializer, CommentSerializer
from ..models import Post, Thread, Comment
from .api import GenericAPIView

class PostView(RetrieveModelMixin,
               UpdateModelMixin,
               DestroyModelMixin,
               GenericAPIView):

    serializer_class = PostSerializer
    model = Post

    def dispatch(self, request, *args, **kwargs):
       self.pk_url_kwarg = "p_id"
       return super(PostView, self).dispatch(request, *args, **kwargs)

    def validate(self, serializer, *args, **kwargs):
        super(PostView, self).validate(serializer)
        if self.is_valid:
            print("valid ", kwargs, args)
            # data = serializer.initial_data


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

#Post ViewSet
class PostCRView(CreateModelMixin,
                ListModelMixin,
                GenericAPIView):

    serializer_class = PostSerializer
    model = Post

    def validate(self, serializer, *args, **kwargs):
        super(PostCRView, self).validate(serializer)
        if self.is_valid:
            print("valid ", kwargs, args)
            # data = serializer.initial_data
            if not Thread.objects.filter(id = kwargs.get("t_id")).exists():
                self.status = status.HTTP_404_NOT_FOUND
                self.data = {
                    "threadid": [
                        "this field is incorrect"
                    ]
                }
                self.is_valid = False
                print("invalid")

    def post(self, request, *args, **kwargs):
        print("post ", kwargs, args)
        self.request = self.parse_request(request);
        print(request.POST)
        print(request.path)
        print(request.content_type)
        print(request.content_params)
        serializer = self.get_serializer(data=self.request)
        self.validate(serializer, args, kwargs)
        if self.is_valid:
            print('valid')
            self.create(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

    def get(self, request, *args, **kwargs):
        print("get ", kwargs, args)
        return self.list(request, args, kwargs)
