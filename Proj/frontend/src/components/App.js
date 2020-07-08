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
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header/Header.js';
import MainPage from './MainPage/MainPage.js';
import ThreadPage from './ThreadPage/ThreadPage.js';

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  body {
    height: 100vh;
    font-family: Verdana, Geneva, sans-serif;
  }

  #app {
    height: 100%;
  }

  .nav-spacer {
    height: 100px;
    width: 100%;
    padding-bottom: 20px;

  }

  // html, body, div, span, applet, object, iframe,
  // h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  // a, abbr, acronym, address, big, cite, code,
  // del, dfn, em, font, img, ins, kbd, q, s, samp,
  // small, strike, strong, sub, sup, tt, var,
  // dl, dt, dd, ol, ul, li,
  // fieldset, form, label, legend,
  // table, caption, tbody, tfoot, thead, tr, th, td {
  // 	margin: 0;
  // 	padding: 0;
  // }
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
    return state;
  }

  render() {
    const { location } = this.props;
    const isModal = (
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    // console.log(this.previousLocation);
    // console.log(location);
    let fixedStyle = '';
    if(isModal) fixedStyle = 'fixed';

    return (
      <div className={`${this.props.className} ${fixedStyle}`}>
        <GlobalStyle />
        <Header />
        <Alert />
        <>
          <Switch location={isModal ? this.state.previousLocation : location}>
            <Route exact path="/">
              <MainPage/>
            </Route>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/r/:id" component={ThreadPage} />
          </Switch>

          {isModal
            ? <Route exact path="/r/:id"><ThreadPage isModal={isModal}/></Route>
            : null
          }
        </>
      </div>
    );
  }
}

const StyledApp = styled(App)`
  height: 100%;
  overflow: auto;

  &.fixed {
    overflow: hidden;
  }
`

export default withRouter(StyledApp);
