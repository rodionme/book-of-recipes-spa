import React from 'react'
import './style.css';


export default class App extends React.Component {
  constructor() {
    super();

    this.q = React.createRef();
  }

  render() {
    return (
      <div className="search-wrapper">
        <form action="" className="search-form" onSubmit={e => this.props.onSearchSubmit(e, this.q.current.value)}>
          <input className="search" name="q" ref={this.q} type="text" placeholder="Input recipe name" autoComplete="off"/>
        </form>
      </div>
    );
  }
}
