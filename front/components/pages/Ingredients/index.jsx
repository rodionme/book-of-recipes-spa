import React from 'react';
import DocumentTitle from 'react-document-title';
import { getIngredients } from "../../../services";
import './style.css';
import Header from '../../Header';


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
      <DocumentTitle title="Ingredients | Book of Recipes">
        <React.Fragment>
          <Header noSearch/>

          <div className="divider divider-2"/>

          <section className="content">
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
          </section>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}
