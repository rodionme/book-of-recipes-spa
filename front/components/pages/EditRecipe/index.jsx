import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import './style.css';
import Header from '../../Header'


export default class EditRecipe extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      category: 1,
      cuisine: 1,
      description: '',
      ingredients: [],

      allCategories: [],
      allCuisines: [],
      allIngredients: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/categories/`)
      .then(({data: allCategories} = response) => {
        this.setState({
          allCategories,
        })
      });

    axios.get(`/api/cuisines/`)
      .then(({data: allCuisines} = response) => {
        this.setState({
          allCuisines,
        })
      });

    axios.get(`/api/ingredients/`)
      .then(({data: allIngredients} = response) => {
        this.setState({
          allIngredients,
        })
      });
  }

  handleChange(e) {
    if (e.currentTarget.name === 'ingredients') {
      let options = e.currentTarget.options;
      let ingredients = [];

      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          ingredients.push(options[i].value);
        }
      }

      this.setState({
        ingredients,
      });
    } else {
      this.setState({
        [e.currentTarget.name]: e.currentTarget.value,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`/api/recipes/`, {
      name: this.state.name,
      category: this.state.category,
      cuisine: this.state.cuisine,
      description: this.state.description,
      ingredients: this.state.ingredients,
    })
      .then(() => {
        this.props.history.push(`/recipes`);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header noSearch/>

        <div className="divider divider-2"/>

        <section className="content">
          <main className="main-content">
            <form action="" method="post" onSubmit={this.handleSubmit}>
              <p>
                <label htmlFor="name">Name:</label>
                <input name="name" onChange={this.handleChange} value={this.state.name} id="name" type="text" placeholder="Name" />
              </p>

              <p>
                <label htmlFor="category">Category: </label>
                <select name="category" onChange={this.handleChange} value={this.state.category}>
                  {this.state.allCategories.map(category => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
                  })}
                </select>
              </p>

              <p>
                <label htmlFor="cuisine">Cuisine: </label>
                <select name="cuisine" onChange={this.handleChange} value={this.state.cuisine}>
                  {this.state.allCuisines.map(cuisine => {
                    return <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                  })}
                </select>
              </p>

              <p>
                <label htmlFor="description">Description: </label>
                <input name="description" onChange={this.handleChange} value={this.state.description} type="text" placeholder="Description" />
              </p>

              <p>
                <label htmlFor="ingredients">Ingredients: </label>
                <select name="ingredients" onChange={this.handleChange} defaultValue={this.state.ingredients} multiple>
                  {this.state.allIngredients.map(ingredient => {
                    return <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                  })}
                </select>
              </p>

              <button type="submit">Save</button>
            </form>
          </main>
        </section>
      </React.Fragment>
    );
  }
}

EditRecipe.propTypes = {
  name: PropTypes.string,
  category: PropTypes.number,
  cuisine: PropTypes.number,
  description: PropTypes.string,
  ingredients: PropTypes.array,
};
