from django.contrib import admin
from .models import Recipe, Ingredient, Cuisine, Category


admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Cuisine)
admin.site.register(Category)
