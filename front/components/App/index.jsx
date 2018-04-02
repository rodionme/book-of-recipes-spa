import React from 'react'
import axios from 'axios';
import './style.css';
import Header from '../Header'
import Filters from '../Filters'
import RecipeList from '../RecipeList'


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
      query: '',
      selectedIngredients: [],
    };

    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
  }

  componentDidMount() {
    this.getRecipes()
  }

  onSearchSubmit(e, query) {
    e.preventDefault();

    this.setState({
      query
    }, this.getRecipes);
  }

  onFiltersSubmit(e, selectedIngredients) {
    e.preventDefault();

    this.setState({
      selectedIngredients
    }, this.getRecipes);
  }

  getRecipes() {
    let params = {};

    if (this.state.query) {
      params.q = this.state.query;
    }

    if (this.state.selectedIngredients.length) {
      params.i = this.state.selectedIngredients.join(',');
    }

    axios.get('api/recipes/', { params })
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

          <Filters onFiltersSubmit={this.onFiltersSubmit}/>
        </section>
      </React.Fragment>
    );
  }
}
