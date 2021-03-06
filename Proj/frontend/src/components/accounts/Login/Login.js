import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth.js';
import styled from 'styled-components';
import theme from '../../../utils/theme.js';
import { Title, Form, Input } from '../../SharedComponents';

const Login = (props) => {
  const {
    login,
    isAuthenticated,
    className,
    goToRegister,
    handleAuthModalClose
  } = props;

  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');

  const onSubmit = (request) => {
    const { username, password } = request;
    login(username, password);
  }

  // if(isAuthenticated) {
  //   return <Redirect to="/" />
  // }

  return (
    <div className={className} onClick={e => e.stopPropagation()}>
      <div className='panel'></div>
      <div className='left-container'>
        <Title
          fontSize='xl'
          title='Login'
          style={{
            color: 'rgb(0,0,0,0.7)',
          }}
        />
        <Form
          submitHandler={onSubmit}
          submit='LOG IN'
          lg
          initialState={{'username': '', 'password' : ''}}
          buttonStyle={{
            backgroundColor: 'theme.themes[globalTheme].highlight',
          }}
          render={(onChange, state) => (
            <>
              <Input
                light
                type="text"
                name="username"
                placeholder="USERNAME"
                onChange={onChange}
                value={state['username']}
              />
              <Input
                light
                type="text"
                name="password"
                placeholder="PASSWORD"
                onChange={onChange}
                value={state['password']}
              />
            </>
          )}
        />
        <div>
          <p>Dont have an account?</p>
          <p onClick={goToRegister} style={{color: 'blue', cursor: 'pointer'}}>Register</p>
        </div>
      </div>
      <div className='x' onClick={handleAuthModalClose}>x</div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const StyledLogin = styled(Login)`
  background-color: white;
  position: relative;
  height: 640px;
  width: 850px;
  box-shadow:
              0 20px 20px 0px rgba(0,0,0,0.12),
              0 24px 24px 0px rgba(0,0,0,0.12),
              4px 0px 4px 0px rgba(0,0,0,0.12),
              20px 0px 20px 0px rgba(0,0,0,0.12),
              -4px 0px 4px 0px rgba(0,0,0,0.12),
              -20px 0px 20px 0px rgba(0,0,0,0.12);

  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .left-container{
    width: 280px;
    height: 300px;
    margin-left: 20px;
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .panel {
    background: url('/assets/panel.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height 100%;
    width: 150px;
  }
  .x {
    position: absolute;
    right: 15px;
    top: 10px;
    color: ${({globalTheme}) => theme.themes[globalTheme].colorA};
    font-size: 35px;
    cursor: pointer;
  }
`

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  globalTheme: state.global.theme
})

export default compose(
  withRouter,
  connect(mapStateToProps, { login })
)(StyledLogin);
