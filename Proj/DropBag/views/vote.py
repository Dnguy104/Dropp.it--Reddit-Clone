# from .mixins import mixins
from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin, RequireTokenMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from ..serializers import UserVoteSerializer
from ..models import Post, Thread, Comment, UserVote
from .api import GenericAPIView
import datetime


class VoteView(RequireTokenMixin,
                CreateModelMixin,
                UpdateModelMixin,
                DestroyModelMixin,
                GenericAPIView):

    serializer_class = UserVoteSerializer
    model = UserVote

    def validate(self, serializer, *args, **kwargs):
        super(VoteView, self).validate(serializer)

        if self.is_valid:
            print("valid ", kwargs, args)
            data = serializer.initial_data
            if not Post.objects.filter(id = data['post']).exists():
                self.status = status.HTTP_404_NOT_FOUND
                self.data = {
                    "post": [
                        "this field is incorrect"
                    ]
                }
                self.is_valid = False
                print("invalid")

    def post(self, request, *args, **kwargs):
        self.request = self.parse_request(request);
        data =  self.request.copy()
        serializer = self.get_serializer(data=self.request)
        user = self.authenticate(request)
        if user is False:
            return JsonResponse(self.data, status=self.status, safe=False)
        data['user'] = user.id
        print("post ", data)
        serializer = self.get_serializer(data=data)
        self.validate(serializer, args, **kwargs)

        if self.is_valid and self.user.id is not None:
            print('valid')
            self.create(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

    def delete(self, request, *args, **kwargs):
        self.request = self.parse_request(request);
        print("delete ", self.request)
        user = self.authenticate(request)
        if user is False:
            print('flase user:', user)
            return JsonResponse(self.data, status=self.status, safe=False)
        vote = {}
        if UserVote.objects.filter(user = self.user.id, post = self.request['post'], comment = self.request['comment']).exists():
            vote = UserVote.objects.get(user = self.user.id, post = self.request['post'], comment = self.request['comment'])
        self.destroy(instance=vote)
        return JsonResponse(self.data, status=self.status)

    def put(self, request, *args, **kwargs):
        print("put ", kwargs, args)
        self.request = self.parse_request(request);
        data =  self.request.copy()
        user = self.authenticate(request)
        data['user'] = user.id
        print('put', data)
        vote = {}
        if UserVote.objects.filter(user = self.user.id, post = data['post'], comment = data['comment']).exists():
            vote = UserVote.objects.get(user = self.user.id, post = data['post'], comment = data['comment'])
        serializer = self.get_serializer(vote, data=data, partial=True)
        self.validate(serializer, *args, **kwargs)
        if self.is_valid and self.user.id is not None:
            self.perform_update(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

    # def get(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #
    #     user = self.authenticate(request)
    #     self.data = self.list(queryset, args, kwargs)
    #     self.data = {i['id']: i for i in self.data}
    #     self.get_score(self.data)
    #     data = {}
    #     if self.user is not None and self.user.id is not None:
    #         data = self.get_userpost_data(list(self.data.keys()))
    #     print(data)
    #     for key in self.data.keys():
    #         if 'votes' in data and key in data['votes']:
    #             self.data[key].update(votestate=data['votes'][key]['score'])
    #         else:
    #             self.data[key].update(votestate=0)
    #     print(self.data)
    #     return JsonResponse(self.data, status=self.status, safe=False)
