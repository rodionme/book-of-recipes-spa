import React from 'react'
import './style.css';
import Search from '../Search';
import Menu from '../Menu';


export default class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
        <a href="/" className="logo">Book of Recipes</a>

        <Search/>
        <Menu />
      </header>
    );
  }
}