import React from 'react';
import DocumentTitle from 'react-document-title';
import { getCategory, deleteCategory } from "../../../services";
import './style.css';
import Header from '../../Header';


export default class Category extends React.Component {
  constructor() {
    super();

    this.state = {
      category: null,
      categoryId: null,
    };

    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentDidMount() {
    this.setState({
      categoryId: this.props.match.params.categoryId,
    }, () => {
      getCategory(this.state.categoryId)
        .then(({data: category} = response) => {
          this.setState({
            category
          });
        })
        .catch(() => {
          this.props.history.replace('/404')
        });
    });
  }

  deleteCategory(e) {
    e.preventDefault();

    deleteCategory(this.state.categoryId)
      .then(() => {
        this.props.history.push(`/categories`);
      });
  }

  render() {
    let category = this.state.category;

    return (
      <DocumentTitle title={category ? `${category.name} | Book of Recipes` : 'Book of Recipes'}>
        <React.Fragment>
          <Header noSearch/>

          <div className="divider divider-2"/>

          <section className="content">
            <main className="main-content">
              {category && (
                <React.Fragment>
                  <p>Name: {category.name}</p>

                  <a href={`/categories/${category.id}/edit`}>Edit</a>
                  <a href="" onClick={this.deleteCategory}>Delete</a>
                </React.Fragment>
              )}
            </main>
          </section>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}
