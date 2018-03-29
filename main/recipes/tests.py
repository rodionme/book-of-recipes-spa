from django.test import TestCase
from django.urls import reverse
from .models import Recipe, Cuisine, Ingredient


def create_recipe(name, cuisine, description):
    """
    Create an recipe with the given name, cuisine, description
    """
    return Recipe.objects.create(name=name, cuisine=cuisine, description=description)


def create_cuisine(name):
    """
    Create a cuisine with the given name
    """
    return Cuisine.objects.create(name=name)


def create_ingredient(name):
    """
    Create an ingredient with the given name
    """
    return Ingredient.objects.create(name=name)


class RecipesViewTest(TestCase):
    def test_no_recipes(self):
        """
        If no recipes exist, an appropriate message is displayed.
        """
        response = self.client.get(reverse('recipes'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'No recipes are available.')
        self.assertQuerysetEqual(response.context['recipes'], [])

    def test_recipe(self):
        """
        The recipes page may display recipe
        """
        cuisine_1 = create_cuisine(name='Cuisine 1')
        ingredient_1 = create_ingredient(name='Ingredient 1')

        recipe_1 = create_recipe(name='Recipe 1', cuisine=cuisine_1, description='Desc for recipe 1')
        recipe_1.ingredients.set([ingredient_1])

        response = self.client.get(reverse('recipes'))

        self.assertQuerysetEqual(response.context['recipes'], ['<Recipe: Recipe 1>'])
        # TODO: Check ingredients list of recipe

    def test_two_recipes(self):
        """
        The recipes page may display multiple recipes
        """
        cuisine_1 = create_cuisine(name='Cuisine 1')

        ingredient_1 = create_ingredient(name='Ingredient 1')
        ingredient_2 = create_ingredient(name='Ingredient 2')

        recipe_1 = create_recipe(name='Recipe 1', cuisine=cuisine_1, description='Desc for recipe 1')
        recipe_1.ingredients.set([ingredient_1])

        recipe_2 = create_recipe(name='Recipe 2', cuisine=cuisine_1, description='Desc for recipe 2')
        recipe_2.ingredients.set([ingredient_1, ingredient_2])

        response = self.client.get(reverse('recipes'))

        self.assertQuerysetEqual(response.context['recipes'],
                                 ['<Recipe: Recipe 1>', '<Recipe: Recipe 2>'], ordered=False)


class IngredientsViewTest(TestCase):
    def test_no_ingredients(self):
        """
        If no ingredients exist, an appropriate message is displayed.
        """
        response = self.client.get(reverse('ingredients'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'No ingredients are available.')
        self.assertQuerysetEqual(response.context['ingredients'], [])

    def test_two_ingredients(self):
        """
        The ingredients page may display multiple ingredients
        """
        create_ingredient(name='Ingredient 1')
        create_ingredient(name='Ingredient 2')
        response = self.client.get(reverse('ingredients'))

        self.assertQuerysetEqual(response.context['ingredients'],
                                 ['<Ingredient: Ingredient 1>', '<Ingredient: Ingredient 2>'], ordered=False)
