import React from 'react'
import './style.css';


export default class Filter extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isChecked: props.filter.selected,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      isChecked: e.target.checked
    });
  };

  render() {
    let filter = this.props.filter;

    return (
      <li>
        <label>
          <input
            type="checkbox"
            name="i"
            onChange={e => this.props.onFilterChange(e, this.props.filter.id, e.target.checked)}
            defaultValue={filter.id}
            defaultChecked={this.state.isChecked}
          />

          <span>{filter.name}</span>
        </label>
      </li>
    );
  }
}
