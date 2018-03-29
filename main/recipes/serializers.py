from rest_framework import serializers
from .models import Recipe, Category, Cuisine, Ingredient


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = ('id', 'name')


class CuisineSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Cuisine
        fields = ('id', 'name')


class IngredientSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Ingredient
        fields = ('id', 'name')


class RecipeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    category = CategorySerializer()
    cuisine = CuisineSerializer()
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = (
            'id',
            'name',
            'category',
            'cuisine',
            'description',
            'ingredients',
        )
