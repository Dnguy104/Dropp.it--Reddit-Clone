import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { register } from '../../../actions/auth.js'
import { createMessage } from '../../../actions/messages.js';
import styled from 'styled-components';
import { Title, Form, Input } from '../../SharedComponents';
import theme from '../../../utils/theme.js';

const Register = (props) => {
  const {
    register,
    createMessage,
    isAuthenticated,
    className,
    goToAuth,
    handleAuthModalClose
  } = props;

  // const [username, setUserName] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [password2, setPassword2] = useState('');

  const onSubmit = (request) => {
    const { username, email, password, password2 } = request;
    if(password !== password2) {
      createMessage({passwordNotMatch: "Passwords do not match"});
    } else {
      const newUser = {
        username,
        password,
        email
      }
      register(newUser);
    }
  }

  // if(isAuthenticated) {
  //   return <Redirect to="/" />
  // }
  return (
    <div className={className} onClick={e => e.stopPropagation()}>
      <div className='panel'></div>
      <div className='left-container'>
        <Title
          style={{
            color: 'rgb(0,0,0,0.7)',
          }}
          fontSize='xl'
          title='Sign up'
        />
        <Form
          submitHandler={onSubmit}
          submit='SIGN UP'
          lg
          initialState={{'email': '', 'username': '', 'password' : '', 'password2' : ''}}
          buttonStyle={{
            backgroundColor: 'theme.themes[globalTheme].highlight',
          }}
          render={(onChange, state) => (
            <>
              <Input
                light
                type="text"
                name="email"
                placeholder="EMAIL"
                onChange={onChange}
                value={state['email']}
              />
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
              <Input
                light
                type="text"
                name="password2"
                placeholder="RE-PASSWORD"
                onChange={onChange}
                value={state['password2']}
              />
            </>
          )}
        />

        <div>
          <p>Already have an account?</p>
          <p onClick={goToAuth} style={{color: 'blue', cursor: 'pointer'}}>Login</p>
        </div>
      </div>
      <div className='x' onClick={handleAuthModalClose}>x</div>
    </div>
  );
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool
};

const StyledRegister = styled(Register)`
  background-color: white;
  height: 650px;
  width: 850px;
  position: relative;
  box-shadow: 0 20px 20px 0px rgba(0,0,0,0.12),
  0 24px 24px 0px rgba(0,0,0,0.12),
  4px 0px 4px 0px rgba(0,0,0,0.12),
  20px 0px 20px 0px rgba(0,0,0,0.12),
  -4px 0px 4px 0px rgba(0,0,0,0.12),
  -20px 0px 20px 0px rgba(0,0,0,0.12);
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .left-container {
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
  connect(mapStateToProps, { register, createMessage })
)(StyledRegister);
