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
      filteredIngredients: [],
    };

    this.onFiltersSubmit = this.onFiltersSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    getIngredients()
      .then(({data: ingredients} = response) => {
        this.setState({
          ingredients,
          filteredIngredients: ingredients,
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

  onSearchChange(e) {
    let filteredIngredients = this.state.ingredients.filter(ingredient =>
      ingredient.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );

    this.setState({ filteredIngredients });
  }

  render() {
    let ingredients = this.state.filteredIngredients;

    return (
      <aside className="filters">
        <form action="" className="filter-form" onSubmit={this.onFiltersSubmit}>
          <section className="filter-group">
            <h4 className="filter-title">Ingredients</h4>

            <input className="filter-search" onChange={this.onSearchChange} type="text" placeholder="Input ingredient name" autoComplete="off"/>

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
  selectedIngredients: PropTypes.arrayOf(PropTypes.number),
  onFiltersSubmit: PropTypes.func,
  onClearFilters: PropTypes.func,
};
