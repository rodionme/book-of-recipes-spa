import React from 'react'
import PropTypes from 'prop-types';
import './style.css';


export default class Filter extends React.Component {
  constructor() {
    super();
  }

  render() {
    let filter = this.props.filter;

    return (
      <li>
        <label>
          <input type="checkbox" name="i" defaultValue={filter.id} defaultChecked={this.props.selected}/>

          <span>{filter.name}</span>
        </label>
      </li>
    );
  }
}

Filter.propTypes = {
  filter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
