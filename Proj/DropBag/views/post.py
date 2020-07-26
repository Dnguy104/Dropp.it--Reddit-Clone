# from .mixins import mixins
from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin,RequireTokenMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import Sum
from ..serializers import PostSerializer, ThreadSerializer, CommentSerializer, UserVoteSerializer
from ..models import Post, Thread, Comment, UserVote
from .api import GenericAPIView
import datetime

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
        instance = self.get_object()
        self.destroy(instance=instance)
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
class PostCRView(RequireTokenMixin,
                CreateModelMixin,
                ListModelMixin,
                GenericAPIView):

    serializer_class = PostSerializer
    model = Post

    def validate(self, serializer, *args, **kwargs):
        super(PostCRView, self).validate(serializer)
        print("valid ", kwargs, args, kwargs.get("t_id"))
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

        data =  self.request.copy()
        data.update(kwargs)
        data['thread'] = data.pop('t_id')

        serializer = self.get_serializer(data=data)
        user = self.authenticate(request)
        if user is False:
            return JsonResponse(self.data, status=self.status, safe=False)
        data['user'] = user.id
        serializer = self.get_serializer(data=data)
        self.validate(serializer, args, **kwargs)

        if self.is_valid and self.user.id is not None:
            print('valid')
            self.create(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

    def get_userpost_data(self, posts):
        print(posts)
        data = {}
        if UserVote.objects.filter(user = self.user.id, post__in = posts).exists():
            try:
                votes = UserVote.objects.filter(user = self.user.id, post__in = posts, comment__isnull=True)
                serializer = self.get_serializer(votes, serializer=UserVoteSerializer, many=True)
                data.update({'votes': {i['post']: i for i in serializer.data}})
            except Exception as e:
                print(e)

        return data

    def get_score(self, posts):
        for key in posts.keys():
            score = {'score': 0}
            if UserVote.objects.filter(post = key, comment__isnull=True).exists():
                try:
                    score = UserVote.objects.filter(post = key, comment__isnull=True).aggregate(score=Sum('score'))
                except Exception as e:
                    print(e)
            print(score)
            posts[key].update(score)


    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        user = self.authenticate(request)
        self.data = self.list(queryset, args, kwargs)
        self.data = {i['id']: i for i in self.data}
        self.get_score(self.data)
        data = {}
        if self.user is not None and self.user.id is not None:
            data = self.get_userpost_data(list(self.data.keys()))
        print(data)
        for key in self.data.keys():
            if 'votes' in data and key in data['votes']:
                self.data[key].update(votestate=data['votes'][key]['score'])
            else:
                self.data[key].update(votestate=0)
        print(self.data)
        return JsonResponse(self.data, status=self.status, safe=False)
