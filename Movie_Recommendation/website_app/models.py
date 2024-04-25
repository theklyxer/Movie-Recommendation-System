from django.db import models

class Member(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)
  phone = models.IntegerField(null=True)
  joined_date = models.DateField(null=True)


  def __str__(self):
    return f"{self.firstname} {self.lastname}"

class user(models.Model):
  email = models.CharField(max_length=255)
  password = models.CharField(max_length=255)

  def __str__(self):
    return f"{self.email}"