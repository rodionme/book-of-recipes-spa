import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import './style.css';
import Header from '../../Header'


export default class EditCategory extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios.post(`/api/categories/`, {
      name: this.state.name,
    })
      .then(() => {
        this.props.history.push(`/categories`);
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
              <p>Name: <input name="name" onChange={this.handleChange} value={this.state.name} type="text" placeholder="Name" /></p>

              <button type="submit">Save</button>
            </form>
          </main>
        </section>
      </React.Fragment>
    );
  }
}

EditCategory.propTypes = {
  name: PropTypes.string,
};
