"""
Mixins providing CRUD functionality for views
"""
from DropBag import status
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from django.db import IntegrityError
# from DropBag.models import Post
from django.contrib.auth import authenticate

class RequireTokenMixin:
    user = None

    def authenticate(self, request):
        if 'Authorization' not in request.headers:
            self.status = status.HTTP_400_BAD_REQUEST
            self.data = {
                "authenticate": [
                    "must be logged in"
                ]
            }
            return False

        authorization = request.headers['Authorization']

        try:
            self.user = authenticate(request, token=authorization)
        except:
            pass
        if self.user.id is not None:
            # A backend authenticated the credentials
            print('authenticated')
            # redirect('comment_create')
        else:
            print('not-authenticated')
            self.status = status.HTTP_400_BAD_REQUEST
            self.data = {
                "authenticate": [
                    "must be logged in"
                ]
            }
            # No backend authenticated the credentials
        print('mixin: ', self.user)
        return self.user



class CreateModelMixin:
    """
    Create a model instance
    """
    def parse_request(self, request):
        return JSONParser().parse(request)

    def validate(self, serializer):
        print('mixin validate')
        if not serializer.is_valid():
            self.status = status.HTTP_404_NOT_FOUND
            self.data = serializer.errors
            self.is_valid = False
            return
        self.is_valid = True

    def create(self, serializer):
        print("create0")
        data = serializer.save()
        self.status = status.HTTP_201_CREATED
        self.data = serializer.data
        print("create")


class UpdateModelMixin:
    """
    Update a model instance.
    """
    def parse_request(self, request):
        return JSONParser().parse(request)

    def validate(self, serializer):
        if not serializer.is_valid():
            self.status = status.HTTP_400_BAD_REQUEST
            self.data = serializer.errors
            self.is_valid = False
            return
        self.is_valid = True

    def get_update(self, request, *args, **kwargs):
        instance = self.get_object()
        if isinstance(instance, dict):
            self.status = status.HTTP_400_BAD_REQUEST
            self.data = instance
        return instance

    def perform_update(self, serializer):
        serializer.save()
        self.status = status.HTTP_200_OK
        self.data = serializer.data

    # def partial_update(self, request, *args, **kwargs):
    #     self.kwargs['partial'] = True
    #     return self.update(request, *args, **kwargs)


class ListModelMixin:
    """
    List a queryset
    """
    def list(self, queryset, *args, **kwargs):
        print("important list: ", queryset)
        serializer = self.get_serializer(queryset, many=True)
        self.status = status.HTTP_200_OK
        return serializer.data

class RetrieveModelMixin:
    """
    Retrieve a model instance.
    """
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if isinstance(instance, dict):
            self.status = status.HTTP_400_BAD_REQUEST
            self.data = instance
            return
        serializer = self.get_serializer(instance)
        self.status = status.HTTP_200_OK
        self.data = serializer.data


class DestroyModelMixin:
    """
    Destroy a model instance.
    """
    def destroy(self, instance=None):
        if isinstance(instance, dict):
            self.status = status.HTTP_404_NOT_FOUND
            self.data = instance
            return
        self.perform_destroy(instance)
        self.status = status.HTTP_204_NO_CONTENT
        self.data = {}

    def perform_destroy(self, instance):
        instance.delete()
