import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';
import EditRecipe from './pages/EditRecipe';
import Recipe from './pages/Recipe';
import Ingredients from './pages/Ingredients';
import EditIngredient from './pages/EditIngredient';
import Ingredient from './pages/Ingredient';
import Cuisines from './pages/Cuisines';
import EditCuisine from './pages/EditCuisine';
import Cuisine from './pages/Cuisine';
import Categories from './pages/Categories';
import EditCategory from './pages/EditCategory';
import Category from './pages/Category';
import NotFound from './pages/NotFound';


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Recipes} />

      <Route exact path="/recipes" component={Recipes}/>,
      <Route exact path="/recipes/add" component={EditRecipe}/>,
      <Route exact path="/recipes/:recipeId" component={Recipe}/>,
      <Route exact path="/recipes/:recipeId/edit" component={EditRecipe}/>,

      <Route exact path="/ingredients" component={Ingredients}/>,
      <Route exact path="/ingredients/add" component={EditIngredient}/>,
      <Route exact path="/ingredients/:ingredientId" component={Ingredient}/>,
      <Route exact path="/ingredients/:ingredientId/edit" component={EditIngredient}/>,

      <Route exact path="/cuisines" component={Cuisines}/>,
      <Route exact path="/cuisines/add" component={EditCuisine}/>,
      <Route exact path="/cuisines/:cuisineId" component={Cuisine}/>,
      <Route exact path="/cuisines/:cuisineId/edit" component={EditCuisine}/>,

      <Route exact path="/categories" component={Categories}/>,
      <Route exact path="/categories/add" component={EditCategory}/>,
      <Route exact path="/categories/:categoryId" component={Category}/>,
      <Route exact path="/categories/:categoryId/edit" component={EditCategory}/>,

      <Route component={NotFound} />,
    </Switch>
  </BrowserRouter>
);

export default Router;