import React from 'react'
import axios from 'axios';
import './style.css';
import Header from '../../Header'


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
      axios.get(`/api/recipes/${this.state.recipeId}/`)
      .then(({data: recipe} = response) => {
        this.setState({
          recipe
        });
      });
    });
  }

  deleteRecipe(e) {
    e.preventDefault();

    axios.delete(`/api/recipes/${this.state.recipeId}/`)
      .then(() => {
        this.props.history.push(`/recipes`);
      });
  }

  render() {
    let recipe = this.state.recipe;

    return (
      <React.Fragment>
        <Header noSearch/>

        <div className="divider divider-2"/>

        <section className="content">
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
        </section>
      </React.Fragment>
    );
  }
}
