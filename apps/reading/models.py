from django.db import models

# Create your models here.
class Reading(models.Model):
    user = models.ForeignKey("user.User", on_delete=models.CASCADE, related_name="user")
    book = models.ForeignKey("book.Book", on_delete=models.CASCADE, related_name="book")
    created_at = models.DateTimeField(auto_now_add=True) 
    rating = models.IntegerField()
    
    class Meta:
        db_table = "Reading"
        
    def __str__(self):
        return f"{self.user} read: ({self.book}) and rate:({self.rating})"