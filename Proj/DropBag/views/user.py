# from .mixins import mixins
from .mixins import CreateModelMixin, UpdateModelMixin, ListModelMixin, RetrieveModelMixin, DestroyModelMixin
from DropBag import status
from django.http import Http404, JsonResponse
from django.utils.translation import gettext as _
from django.db.models import QuerySet
from ..serializers import UserSerializer
from ..models import User
from .api import GenericAPIView
from django.contrib.auth.signals import user_logged_in
from rest_framework_jwt.settings import api_settings
import json

#Post ViewSet
class CreateUserView(CreateModelMixin,
                GenericAPIView):

    serializer_class = UserSerializer
    model = User
    # permission_classes = (AllowAny,)

    # def validate(self, serializer, *args, **kwargs):
    #     super(PostCRView, self).validate(serializer)
    #     if self.is_valid:
    #         print("valid ", kwargs, args)
    #         # data = serializer.initial_data


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
            email = body['email']
            password = body['password']

            user = User.objects.get(email=email, password=password)
            if user:
                try:
                    payload = jwt_payload_handler(user)
                    token = jwt_encode_handler(payload)
                    user_details = {}
                    user_details['name'] = "%s %s" % (
                        user.first_name, user.last_name)
                    user_details['token'] = token
                    user_logged_in.send(sender=user.__class__,
                                        request=request, user=user)
                    return JsonResponse(user_details, status=status.HTTP_200_OK)

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
