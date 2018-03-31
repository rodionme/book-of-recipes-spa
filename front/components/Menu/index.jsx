import React from 'react'
import './style.css';


export default class Menu extends React.Component {
  onClick(e) {
    // TODO: Non-React way
    e.currentTarget.classList.toggle('is-active');
  };

  render() {
    return (
      <React.Fragment>
        <div className="main-menu">
          <button className="hamburger hamburger--spring" onClick={this.onClick} type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"/>
            </span>
          </button>

          <ul className="menu-items-list">
            <li><a href="#add_recipe">Add new recipe</a></li>
            <hr/>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#cuisines">Cuisines</a></li>
            <li><a href="#ingredients">Ingredients</a></li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
