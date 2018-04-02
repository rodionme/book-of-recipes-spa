import React from 'react'
import PropTypes from 'prop-types';
import './style.css';


export default class Recipe extends React.Component {
  renderIngredients() {
    let selectedIngredients = this.props.selectedIngredients;

    return this.props.recipe.ingredients.map(ingredient => {
      if (!selectedIngredients.length || (selectedIngredients && selectedIngredients.indexOf(ingredient.id) > -1)) {
        return <span key={ingredient.id} className="ingredient">{ingredient.name}</span>
      } else {
        return <span key={ingredient.id} className="ingredient missing">{ingredient.name}</span>
      }
    });
  }

  render() {
    let recipe = this.props.recipe;

    return (
      <tr key={recipe.id}>
        <td className="col-name name"><a href="#recipe">{recipe.name}</a></td>
        <td className="col-category category"><span>{recipe.category.name}</span></td>
        <td className="col-cuisine cuisine"><span>{recipe.cuisine.name}</span></td>
        <td className="col-ingredients ingredients">
          {this.renderIngredients()}
        </td>
      </tr>
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.object,
    cuisine: PropTypes.object,
    ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
  selectedIngredients: PropTypes.array,
};
