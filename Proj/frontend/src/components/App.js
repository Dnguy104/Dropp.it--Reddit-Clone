import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alert from './Alert/Alert.js';
import Login from './accounts/Login/Login.js';
import Register from './accounts/Register/Register.js';
import PrivateRoute from './common/PrivateRoute/PrivateRoute.js';
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/auth'

import Header from './Header/Header.js';
import MainPage from './MainPage/MainPage.js';
import ThreadPage from './ThreadPage/ThreadPage.js';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center'
};

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
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <BrowserRouter>
            <>
              <Header />
              <Alert />
              <div className="container">
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
              </div>
            </>
          </BrowserRouter>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
