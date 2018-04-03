import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Cuisines from './pages/Cuisines';
import Ingredients from './pages/Ingredients';
import NotFound from './NotFound';


const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/categories" component={Categories} />
      <Route exact path="/cuisines" component={Cuisines} />
      <Route exact path="/ingredients" component={Ingredients} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;