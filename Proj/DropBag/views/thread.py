from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin, RequireTokenMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import QuerySet
from ..serializers import PostSerializer, ThreadSerializer, CommentSerializer, ThreadSubSerializer
from ..models import Post, Thread, Comment, Thread_Subscription, User
from .api import GenericAPIView
from django.contrib.auth import authenticate

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
class ThreadCRView(RequireTokenMixin,
                    CreateModelMixin,
                    ListModelMixin,
                    GenericAPIView):

    serializer_class = ThreadSerializer
    model = Thread

    def get(self, request, *args, **kwargs):
        user = self.authenticate(request)
        threads = {}
        type = request.GET.get('type')
        if type == 'trending':
            threads = Thread.objects.order_by('id')[:5]
            print(threads)
        else:
            threads = Thread.objects.all()
        # if self.user.id is not None:
        #     threads = Thread.objects.filter(thread_subscribe__user = self.user.id)
        # else:
        #     threads = Thread.objects.all()

        self.data = self.list(threads, args, kwargs)
        if type == 'trending':
            self.data = {'trending': {i['id']: i['id'] for i in self.data}}
        else:
            self.data = {'threads': {i['id']: i for i in self.data}}
        data = {}

        return JsonResponse(self.data, status=self.status, safe=False)

    def post(self, request, *args, **kwargs):
        print("post ", kwargs, args)
        self.request = self.parse_request(request);

        data =  self.request.copy()
        user = self.authenticate(request)
        data['user'] = user.id
        serializer = self.get_serializer(data=data)
        self.validate(serializer)

        if self.is_valid and self.user.id is not None:
            self.create(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

#Thread ViewSet
class ThreadSubscribe(RequireTokenMixin,
                    CreateModelMixin,
                    ListModelMixin,
                    DestroyModelMixin,
                    GenericAPIView):

    serializer_class = ThreadSubSerializer
    model = Thread_Subscription

    def get_queryset(self, obj):

        if self.queryset is not None:
            queryset = self.queryset
            if isinstance(queryset, QuerySet):
                queryset = queryset.filter(user=obj)
        elif self.model is not None:
            queryset = self.model.objects.filter(user=obj)
        else:
            raise ImproperlyConfigured(
                "%(cls)s is missing a QuerySet. Define "
                "%(cls)s.model, %(cls)s.queryset, or override "
                "%(cls)s.get_queryset()." % {
                    'cls': self.__class__.__name__
                }
            )

        return queryset

    def validate(self, serializer, *args, **kwargs):
        super(ThreadSubscribe, self).validate(serializer)
        if self.is_valid:
            if not Thread.objects.filter(id = kwargs.get("t_id")).exists():
                self.status = status.HTTP_404_NOT_FOUND
                self.data = {
                    "threadid": [
                        "this field is incorrect"
                    ]
                }
                self.is_valid = False

    def post(self, request, *args, **kwargs):
        print("subscribe ", kwargs, args)
        self.request = self.parse_request(request);
        data =  self.request.copy()

        print(data)

        user = self.authenticate(request)
        data['user'] = user.id
        serializer = self.get_serializer(data=data)
        self.validate(serializer, t_id=data['thread'])

        if self.is_valid and self.user.id is not None:
            self.create(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

    def check_user(self, *args, **kwargs):
        print("valid ", args, kwargs, kwargs.get("u_id"))
        self.is_valid = True
        if not User.objects.filter(id = kwargs.get('u_id')).exists():
            self.status = status.HTTP_404_NOT_FOUND
            self.data = {
                "userid": [
                    "this field is incorrect"
                ]
            }
            self.is_valid = False
            print("invalid")

    def get(self, request, *args, **kwargs):
        self.check_user(*args, **kwargs)

        if self.is_valid:
            print("get thread subs", kwargs, args)
            queryset = self.get_queryset(kwargs['u_id'])
            self.data = self.list(queryset, args, kwargs)
            print('thread subsssss: ', self.data)
            self.data = {i['id']: i for i in self.data}
        return JsonResponse(self.data, status=self.status, safe=False)

    def delete(self, request, *args, **kwargs):
        self.request = self.parse_request(request);
        print("delete ", self.request)
        user = self.authenticate(request)
        if user is False:
            print('flase user:', user)
            return JsonResponse(self.data, status=self.status, safe=False)
        sub = {}
        print('threaddddddddddd',kwargs.get('thread'))
        print('threaddddddddddd',self.request['thread'])
        if Thread_Subscription.objects.filter(user = self.user.id, thread = self.request['thread']).exists():
            sub = Thread_Subscription.objects.get(user = self.user.id, thread = self.request['thread'])
        print(sub)
        self.destroy(instance=sub)
        return JsonResponse(self.data, status=self.status)
