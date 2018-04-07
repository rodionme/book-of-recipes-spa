import React from 'react';
import DocumentTitle from 'react-document-title';
import { getIngredient, createIngredient, updateIngredient } from "../../../services";
import PropTypes from 'prop-types';
import './style.css';
import Header from '../../Header';


export default class EditIngredient extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredientId: null,
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let ingredientId = this.props.match.params.ingredientId;

    if (ingredientId) {
      this.setState({
        ingredientId,
      }, () => {
        getIngredient(this.state.ingredientId)
          .then(({data: ingredient} = response) => {
            this.setState({
              name: ingredient.name,
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
    let ingredientId = this.state.ingredientId;
    let data = {
      name: this.state.name,
    };

    // TODO: CSRF token is absent
    if (ingredientId) {
      updateIngredient(ingredientId, data)
        .then(() => {
          this.props.history.push(`/ingredients`);
        });
    } else {
      createIngredient(data)
        .then(() => {
          this.props.history.push(`/ingredients`);
        });
    }
  }

  render() {
    let name = this.state.name;

    return (
      <DocumentTitle title={(name ? 'Edit ' : 'Create ') + 'ingredient | Book of Recipes'}>
        <React.Fragment>
          <Header noSearch/>

          <div className="divider divider-2"/>

          <section className="content">
            <main className="main-content">
              <form action="" method="post" onSubmit={this.handleSubmit}>
                <p>Name: <input name="name" onChange={this.handleChange} value={name} type="text" placeholder="Name" /></p>

                <button type="submit">Save</button>
              </form>
            </main>
          </section>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}

EditIngredient.propTypes = {
  name: PropTypes.string,
};
