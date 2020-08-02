import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { setTheme } from '../../actions/global.js';
import { Button, Input, Menu, MenuCaret, DivMenu } from '../SharedComponents';
import styled from 'styled-components';
import theme from '../../utils/theme.js';
import {  FiUserPlus, FiLogOut, FiLogIn } from "react-icons/fi";
import { BsMoon } from "react-icons/bs";

const Header = (props) => {
  const { globalTheme,
    className,
    isAuthenticated,
    logout,
    handleAuth,
    handleRegister,
    user,
    setTheme,
    theme
  } = props

  const toggleTheme = () => {
    if(theme == 'light') setTheme('dark');
    else setTheme('light');
  }

  const links = (toggleMenu) => {
    return (
      <DivMenu globalTheme={globalTheme}>
        <div onClick={()=>{toggleTheme(); }}>
          <BsMoon />
          <p>{theme} Mode</p>
        </div>
        { !!isAuthenticated ?
          <div onClick={()=>{logout(); toggleMenu();}}>
            <FiLogOut />
            <p>Logout</p>
          </div>
        :
          <>
            <div onClick={()=>{handleRegister(); toggleMenu();}}>
              <FiUserPlus />
              <p>Register</p>
            </div>
            <div onClick={()=>{handleAuth(); toggleMenu();}}>
              <FiLogIn />
              <p>Login</p>
            </div>
          </>
        }
      </DivMenu>
    )
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
              height: '40px',
            }}
          />
        </div>
      </div>
      <Menu
        render={links}
        display={
        <div className='menu-button'>
          {user ?
          <p>{user.username}</p>
          :
          <p>Menu</p>}
          <MenuCaret/>
        </div>
        }
      />
    </nav>
  );
};

const StyledHeader = styled(Header)`
  box-sizing: border-box;
  background-color: ${props => theme.themes[props.globalTheme].element};
  box-shadow: 0px 0px 30px 1px rgba(0,0,0, 0.2), inset 0px -5px 15px 0px rgba(200,200,200, 0.1);
  padding-left: 10px;
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 10;

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
    margin-left: 15px;
    width: 250px;
  }
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .menu-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    color: ${({globalTheme})=>theme.themes[globalTheme].colorA};
    border-color: rgba(100,100,100, 0.5);
    border-style: solid;
    border-width: 1px;
    padding: 10px;
    border-radius: 10px;
    :hover {
      border-color: rgba(200,200,200, 0.5);
    }
  }
  ${MenuCaret} {
    border-top-color: ${({globalTheme})=>theme.themes[globalTheme].colorA};
    margin-left: 5px;
  }
`

Header.propTypes = {
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  globalTheme: state.global.theme,
  user: state.auth.user,
  theme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { logout, setTheme }
)(StyledHeader);
