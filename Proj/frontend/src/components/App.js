import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import Alert from './Alert/Alert.js';
import Login from './accounts/Login/Login.js';
import Register from './accounts/Register/Register.js';
import PrivateRoute from './common/PrivateRoute/PrivateRoute.js';
import { Provider } from 'react-redux';
import { loadUser } from '../actions/auth'
import { createGlobalStyle } from 'styled-components'

import Header from './Header/Header.js';
import MainPage from './MainPage/MainPage.js';
import ThreadPage from './ThreadPage/ThreadPage.js';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousLocation: this.props.location
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { location } = props;

    if (!(location.state && location.state.modal)) {
      return {
        previousLocation: location,
      }
    }
  }

  render() {
    const { location } = this.props;
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    console.log(this.previousLocation);
    console.log(location);

    return (
      <>
        <GlobalStyle />
        <Header />
        <Alert />
        <>
          <Switch location={isModal ? this.state.previousLocation : location}>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/r/:id" component={ThreadPage} />
          </Switch>

          {isModal
            ? <Route exact path="/r/:id"><ThreadPage isModal={isModal}/></Route>
            : null
          }
        </>
      </>
    );
  }
}

export default withRouter(App);
