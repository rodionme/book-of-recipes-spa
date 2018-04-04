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
        <Header noSearch/>

        <div className="divider divider-2"/>

        <section className="content">
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
        </section>
      </React.Fragment>
    );
  }
}
