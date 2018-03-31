import React from 'react'
import './style.css';


export default class App extends React.Component {
  render() {
    return (
      <div className="search-wrapper">
        <form action="" className="search-form">
          <input className="search" name="q" type="text" //{% if query %} value="{{ query }}"{% endif %}
                 placeholder="Input recipe name" autoComplete="off"/>
        </form>
      </div>
    );
  }
}
