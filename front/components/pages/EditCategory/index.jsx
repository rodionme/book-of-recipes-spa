import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getCategory, createCategory, updateCategory } from '../../../services';
import Page from '../../layouts/Page';


export default class EditCategory extends React.Component {
  constructor() {
    super();

    this.state = {
      categoryId: null,
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let categoryId = this.props.match.params.categoryId;

    if (categoryId) {
      this.setState({
        categoryId,
      }, () => {
        getCategory(this.state.categoryId)
          .then(({data: category} = response) => {
            this.setState({
              name: category.name,
            });
          })
          .catch(() => {
            this.props.history.replace('/404')
          });
      });
    }
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let categoryId = this.state.categoryId;
    let data = {
      name: this.state.name,
    };

    // TODO: CSRF token is absent
    if (categoryId) {
      updateCategory(categoryId, data)
        .then(() => {
          this.props.history.push(`/categories`);
        });
    } else {
      createCategory(data)
        .then(() => {
          this.props.history.push(`/categories`);
        });
    }
  }

  render() {
    let name = this.state.name;

    return (
      <Page title={(name ? 'Edit ' : 'Create ') + 'category | Book of Recipes'} noSearch>
        <main className="main-content">
          <form action="" method="post" onSubmit={this.handleSubmit}>
            <p>Name: <input name="name" onChange={this.handleChange} value={name} type="text" placeholder="Name" /></p>

            <button type="submit">Save</button>
          </form>
        </main>
      </Page>
    );
  }
}

EditCategory.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};
