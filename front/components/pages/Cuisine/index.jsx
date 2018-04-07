import React from 'react';
import DocumentTitle from 'react-document-title';
import { getCuisine, deleteCuisine } from "../../../services";
import './style.css';
import Header from '../../Header';


export default class Cuisine extends React.Component {
  constructor() {
    super();

    this.state = {
      cuisine: null,
      cuisineId: null,
    };

    this.deleteCuisine = this.deleteCuisine.bind(this);
  }

  componentDidMount() {
    this.setState({
      cuisineId: this.props.match.params.cuisineId,
    }, () => {
      getCuisine(this.state.cuisineId)
        .then(({data: cuisine} = response) => {
          this.setState({
            cuisine
          });
        })
        .catch(() => {
          this.props.history.replace('/404')
        });
    });
  }

  deleteCuisine(e) {
    e.preventDefault();

    deleteCuisine(this.state.cuisineId)
      .then(() => {
        this.props.history.push(`/cuisines`);
      });
  }

  render() {
    let cuisine = this.state.cuisine;

    return (
      <DocumentTitle title={cuisine ? `${cuisine.name} | Book of Recipes` : 'Book of Recipes'}>
        <React.Fragment>
          <Header noSearch/>

          <div className="divider divider-2"/>

          <section className="content">
            <main className="main-content">
              {cuisine && (
                <React.Fragment>
                  <p>Name: {cuisine.name}</p>

                  <a href={`/cuisines/${cuisine.id}/edit`}>Edit</a>
                  <a href="" onClick={this.deleteCuisine}>Delete</a>
                </React.Fragment>
              )}
            </main>
          </section>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}
