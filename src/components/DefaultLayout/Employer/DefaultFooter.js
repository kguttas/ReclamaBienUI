import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { webConfig } from '../../../GlobalConfig';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {

  
  render() {
    let today = new Date();
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="/">{webConfig.siteName}</a> &copy; {today.getFullYear()}</span>
        <span className="ml-auto"><a href = {"mailto:" + webConfig.contactEmail}>{webConfig.contactEmail}</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
