from django.views.generic import TemplateView
from django.db.models import Count
from rest_framework.viewsets import ModelViewSet
from .serializers import RecipeSerializer, CategorySerializer, CuisineSerializer, IngredientSerializer
from .models import Recipe, Ingredient, Cuisine, Category


class IndexView(TemplateView):
    template_name = 'recipes/index.html'


class RecipeViewSet(ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self):
        recipes = Recipe.objects.all()
        query = self.request.GET.get('q')
        ingredients = self.request.GET.get('i')

        if query:
            recipes = recipes.filter(name__contains=query)

        if ingredients:
            ingredients = [x for x in ingredients.split(',')]
            recipes = recipes \
                .filter(ingredients__pk__in=ingredients) \
                .annotate(ingredients_count=Count('ingredients')) \
                .order_by('-ingredients_count')

            # TODO: Implement additional ascending sorting by number of missing ingredients

        return recipes


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CuisineViewSet(ModelViewSet):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer


class IngredientViewSet(ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
