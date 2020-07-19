import React, {  useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import Alert from './Alert/Alert.js';
import Login from './accounts/Login/Login.js';
import Register from './accounts/Register/Register.js';
import PrivateRoute from './common/PrivateRoute/PrivateRoute.js';
import { loadUser } from '../actions/auth'
import { getPosts } from '../actions/posts.js'
import styled, { createGlobalStyle } from 'styled-components'

import Header from './Header/Header.js';
import MainPage from './Pages/MainPage/MainPage.js';
import ThreadPage from './Pages//ThreadPage/ThreadPage.js';
import theme from '../utils/theme.js';

const GlobalStyle = createGlobalStyle`
  :root {
    --b-radius: 3px;
  }

  body, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  body {
    height: 100vh;
    font-family: Verdana, Geneva, sans-serif;
  }

  a, u {
      text-decoration: none;
  }

  #app {
    height: 100%;
  }

  .nav-spacer {
    height: 50px;
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

const App = (props) => {
  const { loaded, className, location, getPosts } = props;
  const [ previousLocation, setPreviousLocation] = useState(location);

  // let isModal = false;
  if (!(location.state && location.state.modal) && previousLocation !== location) {
    setPreviousLocation(location)
  }


  useEffect(() => {
    if(!loaded) getPosts();
  });

  const isModal = (
    location.state &&
    location.state.modal &&
    previousLocation !== location
  );
  // console.log(previousLocation);
  // console.log(location);
  let fixedStyle = '';
  if(isModal) fixedStyle = 'fixed';
  return (
    <div className={`${className} ${fixedStyle}`}>
      <GlobalStyle />
      <Header />
      <Alert />
      <>
        <Switch location={isModal ? previousLocation : location}>
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

const StyledApp = styled(App)`
  height: 100%;
  width: 100%;
  background-color: ${props => theme.themes[props.globalTheme].background};

  &.fixed {
    position: fixed;
  }

  /* .modal {
    width: calc(100% - 100px);
    height: fit-content;
    max-width: 1280px;
  }
  &.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(30,30,30,0.9);
    overflow-y: scroll;
    display: flex;
    justify-content: center;

  } */
`

const mapStateToProps = (state) => ({
  loaded: state.posts.loaded,
  globalTheme: state.global.theme,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { getPosts })
)(StyledApp);
