import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { getCuisines } from "../../../services";
import Page from '../../layouts/Page';


export default class Cuisines extends React.Component {
  constructor() {
    super();

    this.state = {
      cuisines: [],
    };
  }

  componentDidMount() {
    getCuisines()
      .then(({data: cuisines} = response) => {
        this.setState({
          cuisines
        });
      });
  }

  render() {
    let cuisines = this.state.cuisines;

    return (
      <Page title="Cuisines | Book of Recipes" noSearch>
        <main className="main-content">
          {cuisines.length ? (
            <ul>
              {cuisines.map(cuisine => {
                return <li key={cuisine.id}><a href={`/cuisines/${cuisine.id}`}>{cuisine.name}</a></li>
              })}
            </ul>
          )
          :
            <p>No cuisines are available.</p>
          }

          <a href="/cuisines/add">Add new cuisine</a>
        </main>
      </Page>
    );
  }
}

Cuisines.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};
