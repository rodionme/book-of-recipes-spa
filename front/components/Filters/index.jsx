import React from 'react'
import { getIngredients } from "../../services";
import PropTypes from 'prop-types';
import './style.css';
import Filter from '../Filter';


export default class Filters extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
      selectedIngredients: [],
    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidMount() {
    getIngredients()
      .then(({data: ingredients} = response) => {
        this.setState({
          ingredients
        });
      });
  }

  onFilterChange(e, filterId, isChecked) {
    let updatedSelectedIngredients = this.state.selectedIngredients;

    if (isChecked) {
      updatedSelectedIngredients.push(filterId);
    } else {
      updatedSelectedIngredients = updatedSelectedIngredients.filter(e => e !== filterId);
    }

    this.setState({
      selectedIngredients: updatedSelectedIngredients
    });
  }

  render() {
    let ingredients = this.state.ingredients;

    return (
      <aside className="filters">
        <form action="" className="filter-form" onSubmit={e => this.props.onFiltersSubmit(e, this.state.selectedIngredients)}>
          <section className="filter-group">
            <h4 className="filter-title">Ingredients</h4>

            <ul className="filter-list">
              {/* TODO: Pull up selected ingredients to top of the list */}
              {/* TODO: Add filtering input field for a quick finding of ingredient */}

              {ingredients.map(ingredient => {
                return <Filter key={ingredient.id} filter={ingredient} onFilterChange={this.onFilterChange}/>;
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

Filters.propTypes = {
  onFiltersSubmit: PropTypes.func,
};
