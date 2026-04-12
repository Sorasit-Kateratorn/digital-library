from django.db import models

# Create your models here.

class Book(models.Model):
    
    class Genre(models.TextChoices):
        BIOGRAPHY = "Biography", "Biography"
        HISTORY = "History", "History"
        FICTION = "Fiction", "Fiction"
        COMPUTERS = "Computers", "Computers"
        SCIENCE = "Science", "Science"
    
    name = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    created_at = models.DateField(auto_now_add=True)
    genre = models.CharField(max_length=50, choices=Genre.choices, default=Genre.FICTION)
    page = models.IntegerField()
    published = models.CharField(max_length=50, null=True, blank=True)
    cover_image = models.URLField(max_length=500, blank=True, null=True)


    class Meta:
        db_table = "books"
        ordering = ["published"]
        
    def __str__(self): 
        return f"{self.name}({self.author}) ({self.published})"
