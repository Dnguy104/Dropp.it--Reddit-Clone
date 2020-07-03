import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux';
import { BrowserRouter, withRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from '../store.js';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center'
};

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </AlertProvider>
      </Provider>
    );
  }
}

Root.propTypes = {

};



export default ReactDOM.render(<Root/>, document.getElementById('app'));
