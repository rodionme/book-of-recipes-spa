import React from 'react';
import DocumentTitle from 'react-document-title';
import { getIngredient, deleteIngredient } from "../../../services";
import './style.css';
import Header from '../../Header';


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
      <DocumentTitle title={ingredient ? `${ingredient.name} | Book of Recipes` : 'Book of Recipes'}>
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
      </DocumentTitle>
    );
  }
}
