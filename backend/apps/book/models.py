from django.db import models

# Create your models here.

class Book(models.Model):
    
    class Genre(models.TextChoices):
        DRAMA = "Drama", "Drama"
        ROMANCE = "Romance", "Romance"
    
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add=True)
    genre = models.CharField(max_length=50, choices=Genre.choices, default=Genre.ROMANCE)
    page = models.IntegerField()
    published = models.DateField()


    class Meta:
        db_table = "books"
        ordering = ["published"]
        
    def __str__(self): 
        return f"{self.name}({self.author}) ({self.published})"
