import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getIngredient, deleteIngredient } from '../../../services';
import Page from '../../layouts/Page';


export default class Ingredient extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredient: null,
      ingredientId: null,
    };

    this.deleteIngredient = this.deleteIngredient.bind(this);
  }

  componentDidMount() {
    this.setState({
      ingredientId: this.props.match.params.ingredientId,
    }, () => {
      getIngredient(this.state.ingredientId)
        .then(({data: ingredient} = response) => {
          this.setState({
            ingredient
          });
        })
        .catch(() => {
          this.props.history.replace('/404')
        });
    });
  }

  deleteIngredient(e) {
    e.preventDefault();

    deleteIngredient(this.state.ingredientId)
      .then(() => {
        this.props.history.push(`/ingredients`);
      });
  }

  render() {
    let ingredient = this.state.ingredient;

    return (
      <Page title={ingredient ? `${ingredient.name} | Book of Recipes` : 'Book of Recipes'} noSearch>
        <main className="main-content">
          {ingredient && (
            <React.Fragment>
              <p>Name: {ingredient.name}</p>

              <a href={`/ingredients/${ingredient.id}/edit`}>Edit</a>
              <a href="" onClick={this.deleteIngredient}>Delete</a>
            </React.Fragment>
          )}
        </main>
      </Page>
    );
  }
}
