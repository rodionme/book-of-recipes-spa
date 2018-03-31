import React from 'react'
import './style.css';


export default class Filter extends React.Component {
  render() {
    let filter = this.props.filter;

    return (
      <li>
        <label>
          <input type="checkbox" name="i" defaultValue={filter.id} />
          {/* TODO: Provide `selected_ingredients` */}
          {/* if filter.id in selected_ingredients   checked  endif */}

          <span>{filter.name}</span>
        </label>
      </li>
    );
  }
}
