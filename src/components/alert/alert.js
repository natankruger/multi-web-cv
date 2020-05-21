import React from 'react';
import propTypes from 'prop-types';

class Alert extends React.Component {

  render() {
    return <div className={`alert alert-${ this.props.alertType } alert-dismissible`}>
    <span className="close pt-2" aria-label="close" onClick={ () => this.props.closeCallback() }>&times;</span>
    { this.props.message }
  </div>
  }
}

Alert.propTypes = {
  alertType: propTypes.string,
  message: propTypes.string,
  closeCallback: propTypes.func
}

export default Alert;
