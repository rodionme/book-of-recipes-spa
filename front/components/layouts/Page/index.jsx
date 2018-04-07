import React from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import './style.css';
import Header from '../../Header';


export default class Page extends React.Component {
  render() {
    return (
      <DocumentTitle title={this.props.title}>
        <React.Fragment>
          <Header noSearch={this.props.noSearch}/>

          <div className="divider divider-2"/>

          <section className="content">
            {this.props.children}
          </section>
        </React.Fragment>
      </DocumentTitle>
    );
  }
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  noSearch: PropTypes.bool,
  title: PropTypes.string,
};
