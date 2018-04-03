import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group';
import './style.css';


export default class Menu extends React.Component {
  constructor () {
    super();

    this.state = {
      isOpened: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState((prevState, props) => {
      return {
        isOpened: !prevState.isOpened
      }
    });
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

          <CSSTransitionGroup transitionName="slide" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {this.state.isOpened && (
              <ul className="menu-items-list">
                <li><a href="/add_recipe">Add new recipe</a></li>
                <hr/>
                <li><a href="/categories">Categories</a></li>
                <li><a href="/cuisines">Cuisines</a></li>
                <li><a href="/ingredients">Ingredients</a></li>
              </ul>
            )}
          </CSSTransitionGroup>
        </div>
      </React.Fragment>
    );
  }
}
