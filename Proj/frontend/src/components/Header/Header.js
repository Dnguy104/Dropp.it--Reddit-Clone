import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Button, Input, Menu } from '../SharedComponents';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

const Header = (props) => {
  const { className, isAuthenticated, logout, handleAuth, handleRegister } = props

  const links = (toggleMenu) => {
    console.log(isAuthenticated)
    if(!!isAuthenticated) {
      return (
        <Button type="submit" invert onClick={()=>{logout(); toggleMenu();}}>
          Logout
        </Button>
      )
    }
    else {
      return (
        <>
          <Button type="submit" invert onClick={()=>{handleRegister(); toggleMenu();}}>
            Register
          </Button>
          <Button type="submit" invert onClick={()=>{handleAuth(); toggleMenu();}}>
            Login
          </Button>
        </>
      )
    }
  };

  return (
    <nav className={className}>
      <div className='left'>
        <a className="navbar-brand" href="/">DroppIt</a>
        <div className='searchbar'>
          <Input
            type="text"
            name="Search"
            placeholder="Search"
            style={{
              height: '40px'
            }}
          />
        </div>
      </div>
      <Menu render={links}/>
    </nav>
  );
};

const StyledHeader = styled(Header)`
  box-sizing: border-box;
  border-bottom: 1px solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  padding-left: 10px;
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 1;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${props => theme.themes[props.globalTheme].colorB};
  }
  ${Menu} {
    align-self: flex-start;
    padding-top: 4px;
  }
  .searchbar {
    width: 300px;
    margin-left: 15px;
  }
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

Header.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  globalTheme: state.global.theme
});

export default connect(
  mapStateToProps,
  { logout })(StyledHeader);
