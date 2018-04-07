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
    };

    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
  }

  componentDidMount() {
    getIngredients()
      .then(({data: ingredients} = response) => {
        this.setState({
          ingredients
        });
      });
  }

  onFiltersSubmit(e) {
    let selectedIngredients = [];
    let checkboxes = e.currentTarget.querySelectorAll('input[type=checkbox]');

    for (let i = 0, l = checkboxes.length; i < l; i++) {
      if (checkboxes[i].checked) {
        selectedIngredients.push(Number(checkboxes[i].value));
      }
    }

    this.props.onFiltersSubmit(e, selectedIngredients)
  }

  render() {
    let ingredients = this.state.ingredients;

    return (
      <aside className="filters">
        <form action="" className="filter-form" onSubmit={this.onFiltersSubmit}>
          <section className="filter-group">
            <h4 className="filter-title">Ingredients</h4>

            {/* TODO: Add filtering input field for a quick finding of ingredient */}

            <ul className="filter-list">
              {/* Selected ingredients */}
              {ingredients
                .filter(ingredient => this.props.selectedIngredients.indexOf(ingredient.id) > -1)
                .map(ingredient => <Filter key={ingredient.id} filter={ingredient} selected/>)}

              {/* Unselected ingredients */}
              {ingredients
                .filter(ingredient => this.props.selectedIngredients.indexOf(ingredient.id) === -1)
                .map(ingredient => <Filter key={ingredient.id} filter={ingredient}/>)}
            </ul>
          </section>

          <section className="filter-actions">
            <button className="filter-action" type="submit">Apply</button>
            <button className="filter-action" onClick={this.props.onClearFilters} type="button">Clear</button>
          </section>
        </form>
      </aside>
    );
  }
}

Filters.propTypes = {
  onFiltersSubmit: PropTypes.func,
};
