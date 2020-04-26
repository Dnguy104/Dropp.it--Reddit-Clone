import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      if(auth.isLoading) {
        console.log('loading');
        return <h2>Loading</h2>
      } else if(!auth.isAuthenticated) {
        console.log('no authenticated');
        return <Redirect to= "/login" />
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

PrivateRoute.propTypes = {

};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);
