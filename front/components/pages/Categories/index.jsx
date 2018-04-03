import React from 'react'
import axios from 'axios';
import './style.css';
import Header from '../../Header'


export default class Categories extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios.get('/api/categories/')
      .then(({data: categories} = response) => {
        this.setState({
          categories
        });
      });
  }

  render() {
    let categories = this.state.categories;

    return (
      <React.Fragment>
        <Header onSearchSubmit={this.onSearchSubmit}/>

        <div className="divider divider-2"/>

        <section className="content">
          <main className="main-content">
            {categories.length ? (
              <ul>
                {categories.map(category => {
                  return <li key={category.id}><a href={category.id}>{category.name}</a></li>
                })}
              </ul>
            )
            :
              <p>No categories are available.</p>
            }

            <a href="/add-category">Add new category</a>
          </main>
        </section>
      </React.Fragment>
    );
  }
}
