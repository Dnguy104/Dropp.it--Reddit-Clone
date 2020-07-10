from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import QuerySet
from ..serializers import PostSerializer, ThreadSerializer, CommentSerializer
from ..models import Post, Thread, Comment
from .api import GenericAPIView

#Thread ViewSet
class ThreadView(RetrieveModelMixin,
               UpdateModelMixin,
               DestroyModelMixin,
               GenericAPIView):

    serializer_class = ThreadSerializer
    model = Thread

    def dispatch(self, request, *args, **kwargs):
        self.pk_url_kwarg = "t_id"
        return super(ThreadView, self).dispatch(request, *args, **kwargs)

    def validate(self, serializer, *args, **kwargs):
        super(ThreadView, self).validate(serializer)
        if self.is_valid:
            print("valid ", kwargs, args)
            # data = serializer.initial_data


    def get(self, request, *args, **kwargs):
        print("get ", kwargs, args)
        self.retrieve(request, args, kwargs)
        return JsonResponse(self.data, status=self.status, safe=False)

    def delete(self, request, *args, **kwargs):
        print("delete ", kwargs, args)
        self.destroy(request, args, kwargs)
        return JsonResponse(self.data, status=self.status)

    def put(self, request, *args, **kwargs):
        print("put ", kwargs, args)
        self.request = self.parse_request(request);
        instance = self.get_update(request, args, kwargs)
        partial = self.kwargs.pop('partial', False)

        serializer = self.get_serializer(instance, data=self.request, partial=partial)
        self.validate(serializer)
        if self.is_valid:
            self.perform_update(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

#Thread ViewSet
class ThreadCRView(CreateModelMixin,
               ListModelMixin,
               GenericAPIView):

    serializer_class = ThreadSerializer
    model = Thread

    def get(self, request, *args, **kwargs):
        print("get ", kwargs, args)
        return self.list(request, args, kwargs)

    def post(self, request, *args, **kwargs):
        print("post ", kwargs, args)
        self.request = self.parse_request(request);
        serializer = self.get_serializer(data=self.request)
        self.validate(serializer)
        if self.is_valid:
            self.create(serializer)
        return JsonResponse(self.data, status=self.status)
