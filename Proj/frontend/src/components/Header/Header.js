import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Button, Input } from '../SharedComponents';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

const Header = (props) => {
  const { className, auth, logout, handleAuth, handleRegister } = props

  const authLinks = (
    <ul className="">
      <li className="">
        <button
          onClick={logout}
          className="nav-link btn btn-info btn-sml">Logout</button>

      </li>
    </ul>
  );

  const guestLinks = (
    <div className="button-wrapper">
      <Button type="submit" invert onClick={handleRegister}>
        Register
      </Button>
      <Button type="submit" invert onClick={handleAuth}>
        Login
      </Button>
    </div>
  );

  return (
    <nav className={className}>
      <a className="navbar-brand" href="#">DroppIt</a>
      <Input
        type="text"
        name="Search"
        placeholder="Search"
        style={{
          height: '40px'
        }}
      />
      {
        auth.isAuthenticated ? authLinks : guestLinks
      }
    </nav>
  );
};

const StyledHeader = styled(Header)`
  box-sizing: border-box;
  border-bottom: 1px solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  padding: 0px 10px;
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .button-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: calc(100% - 5px);
  }
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
