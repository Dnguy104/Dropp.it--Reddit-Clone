import React, {  useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import Alert from './Alert/Alert.js';
import Login from './accounts/Login/Login.js';
import Register from './accounts/Register/Register.js';
import PrivateRoute from './common/PrivateRoute/PrivateRoute.js';
import { loadUser, loadInit } from '../actions/auth'
import styled, { createGlobalStyle } from 'styled-components'

import { Modal } from './SharedComponents';
import Header from './Header/Header.js';
import PostForm from './Pages/Components/PostForm.js';
import MainPage from './Pages/MainPage/MainPage.js';
import PostPage from './Pages/PostPage/PostPage.js';
import ThreadPage from './Pages/ThreadPage/ThreadPage.js';
import theme from '../utils/theme.js';

const GlobalStyle = createGlobalStyle`
  :root {
    --b-radius: 3px;
  }

  body, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: IBMPlexSans, Arial, sans-serif;
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
    margin-bottom: 20px;

  }

  .modal-wrapper {
    position: fixed;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(30,30,30,0.4);
    overflow-y: scroll;

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
  const {
    loadInit,
    init,
    initLoading,
    className,
    location,
    isAuthenticated,
    loadUser,
    user,
    token,
  } = props;
  const [ previousLocation, setPreviousLocation] = useState(location);
  const [ previousAuth, setPreviousAuth] = useState(isAuthenticated);
  const [ authModal, setAuthModal] = useState(false);
  const [ postModal, setPostModal] = useState(false);
  const [ authModalRender, setAuthModalRender] = useState('');
  let fixedStyle = '';

  // let isModal = false;
  if (!(location.state && location.state.modal) && previousLocation !== location) {
    setPreviousLocation(location)
  }
  useEffect(() => {
    (async ()=>{
      if(token && !user) {
        const loaded = await loadUser();
      }
      if(!init && !initLoading) {
        await loadInit();
      }
    })();
  }, []);

  useEffect(() => {

    if(previousAuth != isAuthenticated) {
      setPreviousAuth(isAuthenticated);
      if(isAuthenticated) setAuthModal(false);
    }
  });

  const handleAuth = () => {
    setAuthModalRender('auth')
    setAuthModal(true);
  }

  const handleRegister = () => {
    setAuthModalRender('register')
    setAuthModal(true);
  }

  const handleAuthModalClose = () => {
    setAuthModal(false);
  }

  const handlePost = () => {
    console.log('handling')
    setPostModal(true);
  }

  const handlePostModalClose = () => {
    setPostModal(false);
  }

  const isModal = (
    location.state &&
    location.state.modal &&
    previousLocation !== location
  );
  // console.log(previousLocation);
  // console.log(location);
  if(isModal) fixedStyle = 'fixed';
  return (
    <div className={`${className} ${fixedStyle}`}>
      <GlobalStyle />
      <Header handleAuth={handleAuth} handleRegister={handleRegister}/>
      <Alert />
      <>
        <Switch location={isModal ? previousLocation : location}>
          <Route exact path="/">
            <MainPage handlePost={handlePost}/>
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/r/:thread" >
            <ThreadPage handlePost={handlePost}/>
          </Route>
          <Route exact path="/r/:thread/:id" component={PostPage} />
        </Switch>

        {isModal
          ?
            <Route exact path="/r/:thread/:id">
              <PostPage isModal={isModal}/>
            </Route>
          : null
        }

        {authModal
          ?
          <Modal
            handleModalClose={handleAuthModalClose}
            render={(handleAuthModalClose)=>(
              authModalRender == 'auth' ?
              <Login goToRegister={handleRegister} handleAuthModalClose={handleAuthModalClose}/>
              : <Register goToAuth={handleAuth} handleAuthModalClose={handleAuthModalClose}/>
          )}/>
          : null
        }

        {postModal
          ?
          <Modal
            handleModalClose={handlePostModalClose}
            render={(handlePostModalClose)=>(
              <PostForm/>
          )}/>
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
  initLoading: state.auth.initLoading,
  globalTheme: state.global.theme,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  token: state.auth.token,
  init: state.auth.init,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { loadUser, loadInit })
)(StyledApp);
