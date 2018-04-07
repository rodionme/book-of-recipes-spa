import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getCuisine, createCuisine, updateCuisine } from '../../../services';
import Page from '../../layouts/Page';


export default class EditCuisine extends React.Component {
  constructor() {
    super();

    this.state = {
      cuisineId: null,
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let cuisineId = this.props.match.params.cuisineId;

    if (cuisineId) {
      this.setState({
        cuisineId,
      }, () => {
        getCuisine(this.state.cuisineId)
          .then(({data: cuisine} = response) => {
            this.setState({
              name: cuisine.name,
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
    let cuisineId = this.state.cuisineId;
    let data = {
      name: this.state.name,
    };

    // TODO: CSRF token is absent
    if (cuisineId) {
      updateCuisine(cuisineId, data)
        .then(() => {
          this.props.history.push(`/cuisines`);
        });
    } else {
      createCuisine(data)
        .then(() => {
          this.props.history.push(`/cuisines`);
        });
    }
  }

  render() {
    let name = this.state.name;

    return (
      <Page title={(name ? 'Edit ' : 'Create ') + 'cuisine | Book of Recipes'} noSearch>
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

EditCuisine.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};
