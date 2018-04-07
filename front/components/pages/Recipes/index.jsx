import React from 'react'
import { getRecipes } from '../../../services';
import PropTypes from 'prop-types';
import './style.css';
import Header from '../../Header'
import Filters from '../../Filters'
import RecipeList from '../../RecipeList'


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
      <React.Fragment>
        <Header onSearchSubmit={this.onSearchSubmit}/>

        <div className="divider divider-2"/>

        <section className="content">
          <RecipeList recipes={this.state.recipes} selectedIngredients={this.state.selectedIngredients}/>

          <div className="divider divider-1"/>

          <Filters onFiltersSubmit={this.onFiltersSubmit}
                   onClearFilters={this.onClearFilters}
                   selectedIngredients={this.state.selectedIngredients}/>
        </section>
      </React.Fragment>
    );
  }
}
