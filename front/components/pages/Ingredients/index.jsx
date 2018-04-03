import React from 'react'
import axios from 'axios';
import './style.css';
import Header from '../../Header'


export default class Ingredients extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    axios.get('/api/ingredients/')
      .then(({data: ingredients} = response) => {
        this.setState({
          ingredients
        });
      });
  }

  render() {
    let ingredients = this.state.ingredients;

    return (
      <React.Fragment>
        <Header onSearchSubmit={this.onSearchSubmit}/>

        <div className="divider divider-2"/>

        <section className="content">
          <main className="main-content">
            {ingredients.length ? (
              <ul>
                {ingredients.map(ingredient => {
                  return <li key={ingredient.id}><a href={ingredient.id}>{ingredient.name}</a></li>
                })}
              </ul>
            )
            :
              <p>No ingredients are available.</p>
            }

            <a href="/add-ingredient">Add new ingredient</a>
          </main>
        </section>
      </React.Fragment>
    );
  }
}
