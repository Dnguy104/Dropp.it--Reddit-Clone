from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)
import datetime

class UserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email,and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                user = self.model(email=email, **extra_fields)
                user.set_password(password)
                user.save(using=self._db)
                return user
        except:
            raise

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_mod', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_mod', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(email, password=password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=40, unique=True)
    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_mod = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self

class Thread(models.Model):
    title = models.CharField(max_length=20, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    about = models.CharField(max_length=500)
    user = models.ForeignKey(User, related_name="threads", on_delete=models.SET_NULL, null=True)
    objects = models.Manager()

class Thread_Subscription(models.Model):
    user = models.ForeignKey(User, related_name="thread_subscribe", on_delete=models.SET_NULL, null=True)
    thread = models.ForeignKey(Thread, related_name="thread_subscribe", on_delete=models.SET_NULL, null=True, blank=False)
    objects = models.Manager()

    class Meta:
        unique_together = [['user', 'thread']]

class Post(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100, blank=True)
    # upvote = models.IntegerField(blank=True, null=True)
    # downvote = models.IntegerField(blank=True, null=True)
    content = models.CharField(max_length=1000)
    created_on = models.DateTimeField(auto_now_add=True, blank=True)
    author = models.CharField(max_length=10)
    thread = models.ForeignKey(Thread, related_name="posts", on_delete=models.SET_NULL, null=True, blank=False)
    user = models.ForeignKey(User, related_name="posts", on_delete=models.SET_NULL, null=True)
    objects = models.Manager()

    # def get_absolute_url(self):
    #     return ('post_detail', (),
    #         {
    #             'slug': self.slug,
    #         })
    def save(self, *args, **kwargs):
        super(Post, self).save(*args, **kwargs)
        if not self.slug:
            self.slug = slugify(self.title) + "-" + str(self.id)
            self.save()
        # if not self.upvote:
        #     self.upvote = 0
        # if not self.downvote:
        #     self.downvote = 0

    class Meta:
        ordering = ['created_on']
        def __unicode__(self):
            return self.title


class Comment(models.Model):
    author = models.CharField(max_length=10)
    content = models.TextField(max_length=1000)
    created_on = models.DateTimeField(auto_now_add=True)
    depth = models.SmallIntegerField(blank=True, null=True)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="comments", null=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True)
    slug = models.SlugField(unique=True, max_length=100, blank=True)
    objects = models.Manager()

    def save(self, *args, **kwargs):
        super(Comment, self).save(*args, **kwargs)
        if not self.depth:
            self.depth = 1
            self.save()
        if not self.slug:
            self.slug = slugify(self.author) + "-" + str(self.id)
            self.save()

class UserVote(models.Model):
    user = models.ForeignKey(User, related_name="UserVote", on_delete=models.CASCADE, null=True)
    score = models.IntegerField()
    post = models.ForeignKey(Post, related_name="UserVote", on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, related_name="UserVote", on_delete=models.SET_NULL, null=True)
    objects = models.Manager()

    class Meta:
        unique_together = [['user', 'post', 'comment']]
