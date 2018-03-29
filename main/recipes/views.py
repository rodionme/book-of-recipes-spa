from django.views.generic import TemplateView
from rest_framework.viewsets import ModelViewSet
from .serializers import RecipeSerializer, CategorySerializer, CuisineSerializer, IngredientSerializer
from .models import Recipe, Ingredient, Cuisine, Category


class IndexView(TemplateView):
    template_name = 'recipes/index.html'


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CuisineViewSet(ModelViewSet):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer


class IngredientViewSet(ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
