import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Recipe from './pages/Recipe';
import Ingredients from './pages/Ingredients';
import Ingredient from './pages/Ingredient';
import Cuisines from './pages/Cuisines';
import Cuisine from './pages/Cuisine';
import Categories from './pages/Categories';
import Category from './pages/Category';
import NotFound from './NotFound';


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Recipes} />

      <Route exact path="/recipes" component={Recipes}/>,
      {/*<Route exact path="recipes/add" component={AddRecipe}/>,*/}
      <Route exact path="/recipes/:recipeId" component={Recipe}/>,
      {/*<Route exact path="recipes/:recipeId/edit" component={EditRecipe}/>,*/}

      <Route exact path="/ingredients" component={Ingredients}/>,
      {/*<Route exact path="/ingredients/add" component={AddIngredient}/>,*/}
      <Route exact path="/ingredients/:ingredientId" component={Ingredient}/>,
      {/*<Route exact path="/ingredients/:ingredientId/edit" component={EditIngredient}/>,*/}

      <Route exact path="/cuisines" component={Cuisines}/>,
      {/*<Route exact path="cuisines/add" component={AddCuisine}/>,*/}
      <Route exact path="/cuisines/:cuisineId" component={Cuisine}/>,
      {/*<Route exact path="cuisines/:cuisineId/edit" component={EditCuisine}/>,*/}

      <Route exact path="/categories" component={Categories}/>,
      {/*<Route exact path="categories/add" component={AddCategory}/>,*/}
      <Route exact path="/categories/:categoryId" component={Category}/>,
      {/*<Route exact path="categories/:categoryId/edit" component={EditCategory}/>,*/}

      <Route component={NotFound} />,
    </Switch>
  </BrowserRouter>
);

export default Router;