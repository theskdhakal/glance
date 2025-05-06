from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Image(models.Model):
    title=models.CharField(max_length=100)
    image=models.ImageField(upload_to='uploads/')
    uploaded_by=models.ForeignKey(User, on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Like(models.Model):
    user=models.ForeignKey(User,On_delete=models.CASCADE)
    image=models.ForeignKey(Image, related_name='likes', on_delete=models.CASCADE)

    class Meta:
        unique_together=('user','image')

