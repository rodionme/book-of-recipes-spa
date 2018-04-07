import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getCategories } from '../../../services';
import Page from '../../layouts/Page';


export default class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    getCategories()
      .then(({data: categories} = response) => {
        this.setState({
          categories
        });
      });
  }

  render() {
    let categories = this.state.categories;

    return (
      <Page title="Categories | Book of Recipes" noSearch>
        <main className="main-content">
          {categories.length ? (
            <ul>
              {categories.map(category => {
                return <li key={category.id}><a href={`/categories/${category.id}`}>{category.name}</a></li>
              })}
            </ul>
          )
          :
            <p>No categories are available.</p>
          }

          <a href="/categories/add">Add new category</a>
        </main>
      </Page>
    );
  }
}
