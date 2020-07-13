import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

const Header = (props) => {
  const { className, auth, logout } = props
  const authLinks = (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <button
          onClick={logout}
          className="nav-link btn btn-info btn-sml">Logout</button>

      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
      <li className="nav-item">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className={className}>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="#">DroppIt</a>
        {
          auth.isAuthenticated ? authLinks : guestLinks
        }
      </div>
    </nav>
  );
};

const StyledHeader = styled(Header)`
  box-sizing: border-box;
  border-bottom: 1px solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  padding-left: 10px;
  padding-right: 10px;
  position: fixed;
  width: 100%;
  z-index: 1;

`

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  globalTheme: state.global.theme
});

export default connect(
  mapStateToProps,
  { logout })(StyledHeader);
