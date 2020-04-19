import React, { Component } from 'react';
import { withAlert } from 'react-alert';

class Alert extends Component {
  componentDidMount() {
    this.props.alert("it shows");
  }

  render() {
    return (
      <Fragment />
    );
  }
}


export default withAlert(Alert);
