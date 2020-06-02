from django.db import models
from django.template.defaultfilters import slugify
# from django.contrib.auth.models import User
# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)

class Thread(models.Model):
    title = models.CharField(max_length=20, unique=True)
    created_on = models.DateTimeField(auto_now_add=True)
    about = models.CharField(max_length=500)
    userid = models.ForeignKey(User, related_name="threads", on_delete=models.SET_NULL, null=True)

class Post(models.Model):
    title = models.CharField(max_length=40)
    slug = models.SlugField(unique=True, max_length=100, blank=True)
    content = models.CharField(max_length=1000)
    created_on = models.DateTimeField(auto_now_add=True)
    author = models.CharField(max_length=10)
    userid = models.ForeignKey(User, related_name="posts", on_delete=models.SET_NULL, null=True)

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

    class Meta:
        ordering = ['created_on']
        def __unicode__(self):
            return self.title


class Comment(models.Model):
    author = models.CharField(max_length=10)
    content = models.TextField(max_length=1000)
    created_on = models.DateTimeField(auto_now_add=True)
    userid = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="comments", null=True)
