import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getIngredients } from '../../../services';
import Page from '../../layouts/Page';


export default class Ingredients extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    getIngredients()
      .then(({data: ingredients} = response) => {
        this.setState({
          ingredients
        });
      });
  }

  render() {
    let ingredients = this.state.ingredients;

    return (
      <Page title="Ingredients | Book of Recipes" noSearch>
        <main className="main-content">
          {ingredients.length ? (
            <ul>
              {ingredients.map(ingredient => {
                return <li key={ingredient.id}><a href={`/ingredients/${ingredient.id}`}>{ingredient.name}</a></li>
              })}
            </ul>
          )
          :
            <p>No ingredients are available.</p>
          }

          <a href="/ingredients/add">Add new ingredient</a>
        </main>
      </Page>
    );
  }
}

Ingredients.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};
