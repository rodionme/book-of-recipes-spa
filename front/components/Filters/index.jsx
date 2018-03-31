import React from 'react'
import './style.css';
import Filter from '../Filter';


export default class Filters extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    fetch('api/ingredients')
      .then(response => {
        return response.json();
      })
      .then(ingredients => {
        this.setState({
          ingredients
        });
      });
  }

  render() {
    let ingredients = this.state.ingredients;

    return (
      <aside className="filters">
        <form action="" className="filter-form">
          <section className="filter-group">
            <h4 className="filter-title">Ingredients</h4>

            <ul className="filter-list">
              {/* TODO: Pull up selected ingredients to top of the list */}
              {/* TODO: Add filtering input field for a quick finding of ingredient */}

              {ingredients.map(ingredient => {
                return <Filter key={ingredient.id} filter={ingredient}/>;
              })}
            </ul>
          </section>

          <button className="filter-apply" type="submit">Apply</button>
          {/* TODO: Add reset button */}
        </form>
      </aside>
    );
  }
}
