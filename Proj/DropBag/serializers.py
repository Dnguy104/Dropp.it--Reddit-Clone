from rest_framework import serializers
from DropBag.models import Post, Thread, Comment
from django.db import IntegrityError

#Post Serializer
class PostSerializer(serializers.ModelSerializer):
    # def is_valid(self, raise_exception=False):
    #     try:
    #         return super(PostSerializer, self).is_valid()
    #     except IntegrityError:

    class Meta:
        model = Post
        fields = '__all__'
        extra_kwargs = {'threadid':{'required': True}}

class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
