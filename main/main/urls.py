from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from recipes import views


router = routers.DefaultRouter()
router.register('recipes', views.RecipeViewSet)
router.register('categories', views.CategoryViewSet)
router.register('cuisines', views.CuisineViewSet)
router.register('ingredients', views.IngredientViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]
