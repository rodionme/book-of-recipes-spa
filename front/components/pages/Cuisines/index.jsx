import React from 'react'
import axios from 'axios';
import './style.css';
import Header from '../../Header'


export default class Cuisines extends React.Component {
  constructor() {
    super();

    this.state = {
      cuisines: [],
    };
  }

  componentDidMount() {
    axios.get('/api/cuisines/')
      .then(({data: cuisines} = response) => {
        this.setState({
          cuisines
        });
      });
  }

  render() {
    let cuisines = this.state.cuisines;

    return (
      <React.Fragment>
        <Header onSearchSubmit={this.onSearchSubmit}/>

        <div className="divider divider-2"/>

        <section className="content">
          <main className="main-content">
            {cuisines.length ? (
              <ul>
                {cuisines.map(cuisine => {
                  return <li key={cuisine.id}><a href={cuisine.id}>{cuisine.name}</a></li>
                })}
              </ul>
            )
            :
              <p>No cuisines are available.</p>
            }

            <a href="/add-cuisine">Add new cuisine</a>
          </main>
        </section>
      </React.Fragment>
    );
  }
}
