from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    class Role(models.TextChoices): # enum
        USER = "User", "User"
        ADMIN = "Admin", "Admin"
        LIBRARIAN = "Librarian", "Librarian"

    class Gender(models.TextChoices):
        MALE = "Male", "Male"
        FEMALE = "Female", "Female"

    role = models.CharField(max_length=9, choices=Role.choices, default=Role.USER)
    gender = models.CharField(max_length=6, choices=Gender.choices, default=Gender.MALE)
    book = models.ManyToManyField("book.Book", through="reading.Reading")

    class Meta:
        db_table = "users"
        ordering = ["username"]
        
    def __str__(self): 
        return f"{self.username}({self.role})"