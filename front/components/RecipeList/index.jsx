import React from 'react'
import './style.css';
import Recipe from '../Recipe';


export default class RecipeList extends React.Component {
  render() {
    let recipes = this.props.recipes;

    return (
      <main className="main-content">
        {recipes.length ?
          <section className="table-wrapper">
            <table className="recipes-table">
              <thead>
                <tr>
                  <th className="col-name">Name</th>
                  <th className="col-category">Category</th>
                  <th className="col-cuisine">Cuisine</th>
                  <th className="col-ingredients">Ingredients</th>
                </tr>
              </thead>

              <tbody>
                {recipes.map(recipe =>
                  <Recipe key={recipe.id} recipe={recipe} selectedIngredients={this.props.selectedIngredients}/>
                )}
              </tbody>
            </table>
          </section>
        :
          <p className="no-data-available">No recipes are available.</p>
        }
      </main>
    );
  }
}
