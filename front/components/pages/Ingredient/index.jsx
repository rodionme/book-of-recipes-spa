import React from 'react'
import axios from 'axios';
import './style.css';
import Header from '../../Header'


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
      axios.get(`/api/ingredients/${this.state.ingredientId}/`)
      .then(({data: ingredient} = response) => {
        this.setState({
          ingredient
        });
      });
    });
  }

  deleteIngredient(e) {
    e.preventDefault();

    axios.delete(`/api/ingredients/${this.state.ingredientId}/`)
      .then(() => {
        this.props.history.push(`/ingredients`);
      });
  }

  render() {
    let ingredient = this.state.ingredient;

    return (
      <React.Fragment>
        <Header noSearch/>

        <div className="divider divider-2"/>

        <section className="content">
          <main className="main-content">
            {ingredient && (
              <React.Fragment>
                <p>Name: {ingredient.name}</p>

                <a href={`/ingredients/${ingredient.id}/edit`}>Edit</a>
                <a href="" onClick={this.deleteIngredient}>Delete</a>
              </React.Fragment>
            )}
          </main>
        </section>
      </React.Fragment>
    );
  }
}
