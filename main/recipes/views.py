from django.urls import reverse
from django.views import generic
from django.db.models import Count
from .models import Recipe, Ingredient, Cuisine, Category


class RecipesView(generic.ListView):
    template_name = 'recipes/recipe/recipes.html'
    context_object_name = 'recipes'

    def get_queryset(self):
        recipes = Recipe.objects.all()
        query = self.request.GET.get('q')
        ingredients = self.request.GET.getlist('i')

        if query:
            recipes = recipes.filter(name__contains=query)

        if ingredients:
            recipes = recipes\
                .filter(ingredients__pk__in=ingredients)\
                .annotate(ingredients_count=Count('ingredients'))\
                .order_by('-ingredients_count')

            # TODO: Implement additional ascending sorting by number of missing ingredients

        return recipes

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context['query'] = self.request.GET.get('q')
        context['ingredients'] = Ingredient.objects.all()
        context['selected_ingredients'] = [int(ingredient_id) for ingredient_id in self.request.GET.getlist('i')]

        return context


class RecipeView(generic.DetailView):
    model = Recipe
    template_name = 'recipes/recipe/recipe.html'


class RecipeCreateView(generic.CreateView):
    model = Recipe
    fields = ['name', 'category', 'cuisine', 'description', 'ingredients']
    template_name = 'recipes/recipe/edit-recipe.html'

    def get_success_url(self):
        return reverse('recipes')


class RecipeUpdateView(generic.UpdateView):
    model = Recipe
    fields = ['name', 'category', 'cuisine', 'description', 'ingredients']
    template_name = 'recipes/recipe/edit-recipe.html'

    def get_success_url(self):
        return reverse('recipe', args=(self.object.id,))


class RecipeDeleteView(generic.DeleteView):
    model = Recipe
    template_name = 'recipes/recipe/delete-recipe.html'

    def get_success_url(self):
        return reverse('recipes')


class IngredientsView(generic.ListView):
    template_name = 'recipes/ingredient/ingredients.html'
    context_object_name = 'ingredients'

    def get_queryset(self):
        return Ingredient.objects.all()


class IngredientView(generic.DetailView):
    model = Ingredient
    template_name = 'recipes/ingredient/ingredient.html'


class IngredientCreateView(generic.CreateView):
    model = Ingredient
    fields = ['name']
    template_name = 'recipes/ingredient/edit-ingredient.html'

    def get_success_url(self):
        return reverse('ingredients')


class IngredientUpdateView(generic.UpdateView):
    model = Ingredient
    fields = ['name']
    template_name = 'recipes/ingredient/edit-ingredient.html'

    def get_success_url(self):
        return reverse('ingredient', args=(self.object.id,))


class IngredientDeleteView(generic.DeleteView):
    model = Ingredient
    template_name = 'recipes/ingredient/delete-ingredient.html'

    def get_success_url(self):
        return reverse('ingredients')


class CuisinesView(generic.ListView):
    template_name = 'recipes/cuisine/cuisines.html'
    context_object_name = 'cuisines'

    def get_queryset(self):
        return Cuisine.objects.all()


class CuisineView(generic.DetailView):
    model = Cuisine
    template_name = 'recipes/cuisine/cuisine.html'


class CuisineCreateView(generic.CreateView):
    model = Cuisine
    fields = ['name']
    template_name = 'recipes/cuisine/edit-cuisine.html'

    def get_success_url(self):
        return reverse('cuisines')


class CuisineUpdateView(generic.UpdateView):
    model = Cuisine
    fields = ['name']
    template_name = 'recipes/cuisine/edit-cuisine.html'

    def get_success_url(self):
        return reverse('cuisine', args=(self.object.id,))


class CuisineDeleteView(generic.DeleteView):
    model = Cuisine
    template_name = 'recipes/cuisine/delete-cuisine.html'

    def get_success_url(self):
        return reverse('cuisines')


class CategoriesView(generic.ListView):
    template_name = 'recipes/category/categories.html'
    context_object_name = 'categories'

    def get_queryset(self):
        return Category.objects.all()


class CategoryView(generic.DetailView):
    model = Category
    template_name = 'recipes/category/category.html'


class CategoryCreateView(generic.CreateView):
    model = Category
    fields = ['name']
    template_name = 'recipes/category/edit-category.html'

    def get_success_url(self):
        return reverse('categories')


class CategoryUpdateView(generic.UpdateView):
    model = Category
    fields = ['name']
    template_name = 'recipes/category/edit-category.html'

    def get_success_url(self):
        return reverse('category', args=(self.object.id,))


class CategoryDeleteView(generic.DeleteView):
    model = Category
    template_name = 'recipes/category/delete-category.html'

    def get_success_url(self):
        return reverse('categories')
