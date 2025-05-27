from django.db import models

class Employee (models.Model):

    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    position = models.CharField(max_length=50)
    department = models.CharField(max_length=100, blank=True)
    present=models.BooleanField(default=False)
    working_hours=models.DecimalField(default=0,max_digits=10,decimal_places=2)
    hire_date = models.DateField(auto_now_add=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    class Meta:
        ordering = ['-created_at']


