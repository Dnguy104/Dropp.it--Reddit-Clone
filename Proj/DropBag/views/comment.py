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

    def validate(self, serializer, *args, **kwargs):
        super(CommentCRView, self).validate(serializer)
        if self.is_valid:
            print("valid ", kwargs, args)
            # data = serializer.initial_data
            if not Post.objects.filter(id = kwargs.get("p_id")).exists():
                self.status = status.HTTP_404_NOT_FOUND
                self.data = {
                    "postid": [
                        "this field is incorrect"
                    ]
                }
                self.is_valid = False
                print("invalid")

    def get(self, request, *args, **kwargs):

        print("get ", kwargs, args)
        return self.list(request, args, kwargs)

    def post(self, request, *args, **kwargs):
        print("post ", kwargs, args)
        return self.create(request, args, kwargs)


class Get_Post_Comments(ListModelMixin,
                    GenericAPIView):

    serializer_class = CommentSerializer
    model = Comment

    def get_queryset(self, post):

        if self.queryset is not None:
            queryset = self.queryset
            if isinstance(queryset, QuerySet):
                queryset = queryset.filter(post=post)
        elif self.model is not None:
            queryset = self.model.object.filter(post=post)
        else:
            raise ImproperlyConfigured(
                "%(cls)s is missing a QuerySet. Define "
                "%(cls)s.model, %(cls)s.queryset, or override "
                "%(cls)s.get_queryset()." % {
                    'cls': self.__class__.__name__
                }
            )

        return queryset

    def validate(self, *args, **kwargs):
        print("valid ", kwargs, args)
        # data = serializer.initial_data
        if not Post.objects.filter(id = kwargs.get("p_id")).exists():
            self.status = status.HTTP_404_NOT_FOUND
            self.data = {
                "postid": [
                    "this field is incorrect"
                ]
            }
            self.is_valid = False
            print("invalid")

    def get(self, request, *args, **kwargs):
        self.validate(args, kwargs)

        print("get collection", kwargs, args)
        if self.is_valid:
            print('valid')
            self.list(request, args, kwargs)
        return JsonResponse(self.data, status=self.status, safe=False)

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
