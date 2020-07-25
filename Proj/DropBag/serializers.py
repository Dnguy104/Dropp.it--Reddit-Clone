from rest_framework import serializers
from DropBag.models import Post, Thread, Comment, User, Thread_Subscription, UserVote
from django.db import IntegrityError
from datetime import datetime
import time

class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.ReadOnlyField()

    class Meta(object):
        model = User
        fields = ('id', 'email', 'first_name', 'last_name',
                  'date_joined', 'password', 'username')
        extra_kwargs = {
            'password': {'write_only': True},
            'username':{'required': True}
        }

#Post Serializer
class PostSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super(PostSerializer, self).to_representation(instance)
        timestamp = datetime.timestamp(instance.created_on)
        representation['created_on'] = timestamp
        return representation

    class Meta:
        model = Post
        fields = ('title', 'slug', 'content', 'created_on', 'author', 'thread', 'user', 'id', 'upvote', 'downvote')

        extra_kwargs = {
            'threadid':{'required': True}
        }

class ThreadSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super(ThreadSerializer, self).to_representation(instance)
        timestamp = datetime.timestamp(instance.created_on)
        representation['created_on'] = timestamp
        return representation

    class Meta:
        model = Thread
        fields = '__all__'

class ThreadSubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread_Subscription
        fields = '__all__'

class UserVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVote
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super(CommentSerializer, self).to_representation(instance)
        print(type(instance.created_on))
        timestamp = datetime.timestamp(instance.created_on)
        representation['created_on'] = timestamp
        print(representation['created_on'])

        return representation

    class Meta:
        model = Comment
        fields = '__all__'
