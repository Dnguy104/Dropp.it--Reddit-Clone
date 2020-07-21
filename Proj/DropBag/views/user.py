# from .mixins import mixins
from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin, RequireTokenMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import QuerySet
from ..serializers import UserSerializer
from ..models import User, Thread_Subscription
from .api import GenericAPIView
from django.contrib.auth.signals import user_logged_in
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import authenticate
from django.shortcuts import redirect

from rest_framework_jwt.settings import api_settings
key = api_settings.JWT_SECRET_KEY
from django.contrib.auth import authenticate
import jwt
import json

#Post ViewSet
class CreateUserView(CreateModelMixin,
                GenericAPIView):

    serializer_class = UserSerializer
    model = User

    def post(self, request, *args, **kwargs):
        print("post ", kwargs, args)
        self.request = self.parse_request(request);

        serializer = self.get_serializer(data=self.request)
        print('validate')
        self.validate(serializer, *args, **kwargs)
        if self.is_valid:
            print('valid')
            self.create(serializer)
        return JsonResponse(self.data, status=self.status, safe=False)

class AuthenticateUser(CreateModelMixin,
                GenericAPIView):
    def post(self, request, *args, **kwargs):
        try:
            jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
            jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
            print(request.body)
            print(args)
            print(kwargs)
            # body_unicode = request.body.decode('utf-8')
            body = json.loads(request.body)
            username = body['username']
            password = body['password']

            user = User.objects.get(username=username, password=password)
            if user:
                try:
                    # encoded = jwt.encode({'some': 'payload'}, key, algorithm='HS256')
                    payload = jwt_payload_handler(user)
                    print(payload)
                    # token = jwt_encode_handler(payload)
                    token = jwt.encode(payload, key, algorithm='HS256')
                    user_details = {}
                    user_details['name'] = "%s %s" % (
                        user.first_name, user.last_name)
                    user_details['token'] = token.decode('utf-8')
                    user_logged_in.send(sender=user.__class__,
                                        request=request, user=user)
                    response = JsonResponse(user_details, status=status.HTTP_200_OK)
                    # response.set_cookie('token', user_details['token'], max_age=300)
                    return response

                except Exception as e:
                    raise e
            else:
                res = {
                    'error': 'can not authenticate with the given credentials or the account has been deactivated'}
                return JsonResponse(res, status=status.HTTP_403_FORBIDDEN)
        except KeyError:
            self.status = status.HTTP_404_NOT_FOUND
            self.data = {'error': 'please provide a email and a password'}

            return JsonResponse(self.data, status=self.status)

    # def get(self, request, *args, **kwargs):
    #     print(request.headers)
    #     print(request.path)
    #     print(args)
    #     print(kwargs)
    #     authorization = request.headers['Authorization']
    #     user = authenticate(request, token=authorization)
    #
    #     if user is not None:
    #         # A backend authenticated the credentials
    #         print('authenticated')
    #         # redirect('comment_create')
    #     else:
    #         print('not-authenticated')
    #         # No backend authenticated the credentials
    #
    #     self.status = status.HTTP_403_FORBIDDEN
    #     self.data = {'error': 'must login'}
    #
    #     # user = authenticate(request, email=email, password=password)
    #
    #     return JsonResponse(self.data, status=self.status)

class UserProfile(RequireTokenMixin,
                ListModelMixin,
                GenericAPIView):

    model = User

    def validate(self, *args, **kwargs):
        self.is_valid = True
        # if not Post.objects.filter(id = kwargs.get('p_id')).exists():
        #     self.status = status.HTTP_404_NOT_FOUND
        #     self.data = {
        #         "postid": [
        #             "this field is incorrect"
        #         ]
        #     }
        #     self.is_valid = False
        #     print("invalid")

    def get(self, request, *args, **kwargs):
        print(request.headers)
        print(request.path)
        print(args)
        print(kwargs)
        user = self.authenticate(request)
        self.validate(*args, **kwargs)

        if self.is_valid and self.user.id is not None:
            subs = Thread_Subscription.objects.filter(user=user.id)
            print('subs: ')
            print(subs)
            self.data['username'] = user.username
            self.data['subs'] = {i['id']: i for i in subs}
            self.status = status.HTTP_200_OK

        return JsonResponse(self.data, status=self.status, safe=False)
