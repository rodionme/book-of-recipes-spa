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
      selectedIngredients: [],
    };

    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
  }

  componentDidMount() {
    // TODO: Move requests to the separate services
    axios.get('api/recipes/')
      .then(({data: recipes} = response) => {
        this.setState({
          recipes
        });
      });
  }

  onFiltersSubmit(e, selectedIngredients) {
    e.preventDefault();

    this.setState({
      selectedIngredients
    });

    axios.get('api/recipes/', {
      params: {
        i: selectedIngredients.join(',')
      }
    })
      .then(({data: recipes} = response) => {
        this.setState({
          recipes,
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header/>

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
