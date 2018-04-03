import React from 'react'
import axios from 'axios';
import './style.css';
import Header from '../../Header'


export default class Categories extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header onSearchSubmit={this.onSearchSubmit}/>

        <div className="divider divider-2"/>

        <section className="content">
        </section>
      </React.Fragment>
    );
  }
}
