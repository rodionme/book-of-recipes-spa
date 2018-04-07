import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getRecipes } from '../../../services';
import Page from '../../layouts/Page';
import Filters from '../../Filters';
import RecipeList from '../../RecipeList';


export default class Recipes extends React.Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
      query: '',
      selectedIngredients: [],
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
  }

  componentDidMount() {
    this.requestRecipes()
  }

  onSearchSubmit(e, query) {
    e.preventDefault();

    this.setFilter({ query });
  }

  onFiltersSubmit(e, selectedIngredients) {
    e.preventDefault();

    this.setFilter({ selectedIngredients });
  }

  onClearFilters() {
    this.setFilter({ selectedIngredients: [] });
  }

  setFilter(filter) {
    this.setState(filter, this.requestRecipes);
  }

  requestRecipes() {
    let params = {};

    if (this.state.query) {
      params.q = this.state.query;
    }

    if (this.state.selectedIngredients.length) {
      params.i = this.state.selectedIngredients.join(',');
    }

    getRecipes(params)
      .then(({data: recipes} = response) => {
        this.setState({
          recipes,
        });
      });
  }

  render() {
    return (
      <Page title="Book of Recipes">
        <RecipeList recipes={this.state.recipes} selectedIngredients={this.state.selectedIngredients}/>

        <div className="divider divider-1"/>

        <Filters onFiltersSubmit={this.onFiltersSubmit}
                 onClearFilters={this.onClearFilters}
                 selectedIngredients={this.state.selectedIngredients}/>
      </Page>
    );
  }
}

Recipes.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};
