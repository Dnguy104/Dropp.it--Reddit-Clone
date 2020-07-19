from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import AnonymousUser
from rest_framework_jwt.settings import api_settings
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER
jwt_get_username_from_payload = api_settings.JWT_PAYLOAD_GET_USERNAME_HANDLER
key = api_settings.JWT_SECRET_KEY
from ..models import User
import json
import jwt


class Auth(ModelBackend):
    supports_object_permissions = True
    supports_anonymous_user = True
    supports_inactive_user = False

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

    # def authenticate(self, request, username=None, password=None):
    #     print('inside custom auth')
    #     try:
    #         user = User.objects.get(
    #             Q(username=username) | Q(email=username) )
    #         print(user)
    #     except User.DoesNotExist:
    #         return None
    #     print(user)
    #     if user.check_password(password):
    #          return user
    #     else:
    #         return None

    def _check_payload(self, token):
        # Check payload valid (based off of JSONWebTokenAuthentication,
        # may want to refactor)
        payload = None
        try:
            # payload = jwt_decode_handler(token)
            payload = jwt.decode(token, key, algorithms='HS256')
        except jwt.ExpiredSignature:
            msg = 'Signature has expired.'
            print(msg)

        except jwt.DecodeError:
            msg = 'Error decoding signature.'
            print(msg)

        return payload

    def _check_user(self, payload):
        print('payload:', payload)
        user = AnonymousUser()

        # Make sure user exists
        try:
            user = self.get_user(payload['user_id'])
        except:
            pass

        return user

    def authenticate(self, username=None, password=None, *args, **kwargs):
        print('decoding')
        print(args)
        token = kwargs['token'][7:]
        # token = kwargs['token']
        print('token: ', token)
        # token = json.load(token)
        payload = self._check_payload(token=token)
        user = self._check_user(payload=payload)
        print(user)

        return user
