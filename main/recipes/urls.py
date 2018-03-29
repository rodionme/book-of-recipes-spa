from django.urls import path
from . import views

urlpatterns = [
    path('', views.RecipesView.as_view(), name='index'),

    path('recipes/', views.RecipesView.as_view(), name='recipes'),
    path('recipes/<int:pk>/', views.RecipeView.as_view(), name='recipe'),
    path('recipes/add', views.RecipeCreateView.as_view(), name='add_recipe'),
    path('recipes/<int:pk>/edit', views.RecipeUpdateView.as_view(), name='edit_recipe'),
    path('recipes/<int:pk>/delete', views.RecipeDeleteView.as_view(), name='delete_recipe'),

    path('ingredients/', views.IngredientsView.as_view(), name='ingredients'),
    path('ingredients/<int:pk>/', views.IngredientView.as_view(), name='ingredient'),
    path('ingredients/add/', views.IngredientCreateView.as_view(), name='add_ingredient'),
    path('ingredients/<int:pk>/edit/', views.IngredientUpdateView.as_view(), name='edit_ingredient'),
    path('ingredients/<int:pk>/delete/', views.IngredientDeleteView.as_view(), name='delete_ingredient'),

    path('cuisines/', views.CuisinesView.as_view(), name='cuisines'),
    path('cuisines/<int:pk>/', views.CuisineView.as_view(), name='cuisine'),
    path('cuisines/add', views.CuisineCreateView.as_view(), name='add_cuisine'),
    path('cuisines/<int:pk>/edit', views.CuisineUpdateView.as_view(), name='edit_cuisine'),
    path('cuisines/<int:pk>/delete', views.CuisineDeleteView.as_view(), name='delete_cuisine'),

    path('categories/', views.CategoriesView.as_view(), name='categories'),
    path('categories/<int:pk>/', views.CategoryView.as_view(), name='category'),
    path('categories/add', views.CategoryCreateView.as_view(), name='add_category'),
    path('categories/<int:pk>/edit', views.CategoryUpdateView.as_view(), name='edit_category'),
    path('categories/<int:pk>/delete', views.CategoryDeleteView.as_view(), name='delete_category'),
]
