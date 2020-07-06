# from django.views.generic import View
from django.views.generic.base import ContextMixin, View
from DropBag import mixins, status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import QuerySet
from .serializers import PostSerializer, ThreadSerializer, CommentSerializer
from .models import Post, Thread, Comment

class GenericAPIView(ContextMixin, View):
    queryset = None
    serializer_class = None
    model = None
    slug_field = 'slug'
    slug_url_kwarg = 'slug'
    pk_url_kwarg = 'id'
    query_pk_and_slug = False

    serializer = None
    request = None
    data = None
    status = None
    is_valid = False

    def get_queryset(self):

        if self.queryset is not None:
            queryset = self.queryset
            if isinstance(queryset, QuerySet):
                queryset = queryset.all()
        elif self.model is not None:
            queryset = self.model._default_manager.all()
        else:
            raise ImproperlyConfigured(
                "%(cls)s is missing a QuerySet. Define "
                "%(cls)s.model, %(cls)s.queryset, or override "
                "%(cls)s.get_queryset()." % {
                    'cls': self.__class__.__name__
                }
            )

        return queryset

    def get_object(self, queryset=None):
        """
        Returns the object the view is displaying.
        You may want to override this if you need to provide non-standard
        queryset lookups.  Eg if objects are referenced using multiple
        keyword arguments in the url conf.
        """
        # Use a custom queryset if provided; this is required for subclasses
        # like DateDetailView
        if queryset is None:
            queryset = self.get_queryset()

        # Next, try looking up by primary key.
        pk = self.kwargs.get(self.pk_url_kwarg)
        slug = self.kwargs.get(self.slug_url_kwarg)
        if pk is not None:
            queryset = queryset.filter(pk=pk)

        # Next, try looking up by slug.
        if slug is not None and (pk is None or self.query_pk_and_slug):
            slug_field = self.get_slug_field()
            queryset = queryset.filter(**{slug_field: slug})

        # If none of those are defined, it's an error.
        if pk is None and slug is None:
            raise AttributeError(
                "Generic detail view %s must be called with either an object "
                "pk or a slug in the URLconf." % self.__class__.__name__
            )

        try:
            # Get the single item from the filtered queryset
            obj = queryset.get()
        except queryset.model.DoesNotExist:
            return {
                "errors": [
                    ("No %(verbose_name)s found matching the query") %
                        {'verbose_name': queryset.model._meta.verbose_name}
                ]
            }
        return obj

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def get_serializer_class(self):
        assert self.serializer_class is not None, (
            "'%s' should either include a `serializer_class` attribute, "
            "or override the `get_serializer_class()` method."
            % self.__class__.__name__
        )
        return self.serializer_class

    def get_serializer_context(self):
        """
        Extra context provided to the serializer class.
        """
        return {
            'request': self.request,
        }

    def get_slug_field(self):
        """Get the name of a slug field to be used to look up by slug."""
        return self.slug_field


class PostView(mixins.RetrieveModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
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
class PostCRView(mixins.CreateModelMixin,
                mixins.ListModelMixin,
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
        self.validate(serializer, *args, **kwargs)
        if self.is_valid:
            print('valid')
            self.create(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

    def get(self, request, *args, **kwargs):
        print("get ", kwargs, args)
        return self.list(request, args, kwargs)


#Thread ViewSet
class ThreadView(mixins.RetrieveModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
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
class ThreadCRView(mixins.CreateModelMixin,
               mixins.ListModelMixin,
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


#Comment ViewSet
class CommentCRView(mixins.CreateModelMixin,
               mixins.ListModelMixin,
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
class CommentView(mixins.RetrieveModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
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
