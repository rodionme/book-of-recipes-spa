import React from 'react';
import DocumentTitle from 'react-document-title';
import {
  getCategories,
  getCuisines,
  getIngredients,
  getRecipe,
  createRecipe,
  updateRecipe
} from "../../../services";
import PropTypes from 'prop-types';
import './style.css';
import Header from '../../Header';


export default class EditRecipe extends React.Component {
  constructor() {
    super();

    this.state = {
      recipeId: null,
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
    let recipeId = this.props.match.params.recipeId;

    if (recipeId) {
      this.setState({
        recipeId,
      }, () => {
        getRecipe(this.state.recipeId)
          .then(({data: recipe} = response) => {
            this.setState({
              name: recipe.name,
              category: recipe.category.id,
              cuisine: recipe.cuisine.id,
              description: recipe.description,
              ingredients: recipe.ingredients.map(ingredient => {
                return ingredient.id;
              }),
            });
          });
      });
    }

    getCategories()
      .then(({data: allCategories} = response) => {
        this.setState({
          allCategories,
        })
      });

    getCuisines()
      .then(({data: allCuisines} = response) => {
        this.setState({
          allCuisines,
        })
      });

    getIngredients()
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
    let recipeId = this.state.recipeId;
    let data = {
      name: this.state.name,
      category: this.state.category,
      cuisine: this.state.cuisine,
      description: this.state.description,
      ingredients: this.state.ingredients,
    };

    // TODO: CSRF token is absent
    if (recipeId) {
       updateRecipe(recipeId, data)
        .then(() => {
          this.props.history.push(`/recipes`);
        });
    } else {
      createRecipe(data)
        .then(() => {
          this.props.history.push(`/recipes`);
        });
    }
  }

  render() {
    let name = this.state.name;

    return (
      <DocumentTitle title={(name ? 'Edit ' : 'Create ') + 'recipe | Book of Recipes'}>
        <React.Fragment>
          <Header noSearch/>

          <div className="divider divider-2"/>

          <section className="content">
            <main className="main-content">
              <form action="" method="post" onSubmit={this.handleSubmit}>
                <p>
                  <label htmlFor="name">Name:</label>
                  <input name="name" onChange={this.handleChange} value={name} id="name" type="text" placeholder="Name" />
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
                  <textarea name="description" onChange={this.handleChange} value={this.state.description} placeholder="Description" />
                </p>

                <p>
                  <label htmlFor="ingredients">Ingredients: </label>
                  <select name="ingredients" onChange={this.handleChange} value={this.state.ingredients} multiple>
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
      </DocumentTitle>
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
