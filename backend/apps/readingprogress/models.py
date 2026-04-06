from django.db import models

# Create your models here.
class ReadingProgress(models.Model):
    reading = models.ForeignKey("reading.Reading", on_delete=models.CASCADE, related_name="reading")
    page_number = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True) 
    summarize = models.CharField(max_length=500, null=True, blank=True)


    
    class Meta:
        db_table = "ReadingProgress"
        ordering = ["page_number"]
        
    def __str__(self):
        return f"Reading ID: {self.reading.id} (Progress: {self.id})"
        