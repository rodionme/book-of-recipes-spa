import React from 'react'
import './style.css';


export default class App extends React.Component {
  render() {
    let recipe = this.props.recipe;

    return (
      <tr key={recipe.id}>
        <td className="col-name name"><a href="#recipe">{recipe.name}</a></td>
        <td className="col-category category"><span>{recipe.category.name}</span></td>
        <td className="col-cuisine cuisine"><span>{recipe.cuisine.name}</span></td>
        <td className="col-ingredients ingredients">
          {recipe.ingredients.map(ingredient => {
            {/* TODO: Provide `selected_ingredients` */}
            {/*{% if not selected_ingredients or selected_ingredients and ingredient.id in selected_ingredients %}*/}
            return <span key={ingredient.id} className="ingredient">{ingredient.name}</span>
            {/*{% else %}*/}
            {/*<span className="ingredient missing">{ingredient.name}</span>*/}
            {/*{% endif %}*/}
          })}
        </td>
      </tr>
    );
  }
}
