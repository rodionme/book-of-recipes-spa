from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    # type

    def __str__(self):
        return self.name


class Cuisine(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    cuisine = models.ForeignKey(Cuisine, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    # image(s?)

    def __str__(self):
        return self.name
