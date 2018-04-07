import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getRecipe, deleteRecipe } from '../../../services';
import Page from '../../layouts/Page';


export default class Recipe extends React.Component {
  constructor() {
    super();

    this.state = {
      recipe: null,
      recipeId: null,
    };

    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentDidMount() {
    this.setState({
      recipeId: this.props.match.params.recipeId,
    }, () => {
      getRecipe(this.state.recipeId)
        .then(({data: recipe} = response) => {
          this.setState({
            recipe
          });
        })
        .catch(() => {
          this.props.history.replace('/404')
        });
    });
  }

  deleteRecipe(e) {
    e.preventDefault();

    deleteRecipe(this.state.recipeId)
      .then(() => {
        this.props.history.push(`/recipes`);
      });
  }

  render() {
    let recipe = this.state.recipe;

    return (
      <Page title={recipe ? `${recipe.name} | Book of Recipes` : 'Book of Recipes'} noSearch>
        <main className="main-content">
          {recipe && (
            <React.Fragment>
              <p>Name: {recipe.name}</p>
              <p>Category: {recipe.category.name}</p>
              <p>Cuisine: {recipe.cuisine.name}</p>
              <p>Description: {recipe.description}</p>
              <p>Ingredients:</p>
              <ul>
                {recipe.ingredients.map(ingredient => {
                  return <li key={ingredient.id}>{ingredient.name}</li>
                })}
              </ul>

              <a href={`/recipes/${recipe.id}/edit`}>Edit</a>
              <a href="" onClick={this.deleteRecipe}>Delete</a>
            </React.Fragment>
          )}
        </main>
      </Page>
    );
  }
}

Recipe.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};
