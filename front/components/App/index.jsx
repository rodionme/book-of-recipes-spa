import React from 'react'
import './style.css';
import Header from '../Header'
import Filters from '../Filters'
import RecipeList from '../RecipeList'


export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header/>

        <div className="divider divider-2"/>

        <section className="content">
          <RecipeList/>

          <div className="divider divider-1"/>

          <Filters/>
        </section>
      </React.Fragment>
    );
  }
}
