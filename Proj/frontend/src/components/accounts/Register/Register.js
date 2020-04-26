import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../../actions/auth.js'
import { createMessage } from '../../../actions/messages.js';

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { password, password2 } = this.state;
    if(password !== password2) {
      this.props.createMessage({passwordNotMatch: "Passwords do not match"});
    } else {
      console.log('submit');
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { username, email, password, password2 } = this.state;

    return (
      <div className="form-ctn">
        <div className="form-card">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <label>Username</label>
            <input
              type="text"
              className="form-input"
              name="username"
              onChange={this.onChange}
              value={username}
            />
            <label>Email</label>
            <input
              type="text"
              className="form-input"
              name="email"
              onChange={this.onChange}
              value={email}
            />
            <label>Password</label>
            <input
              type="text"
              className="form-input"
              name="password"
              onChange={this.onChange}
              value={password}
            />
            <label>Confirm Password</label>
            <input
              type="text"
              className="form-input"
              name="password2"
              onChange={this.onChange}
              value={password2}
            />
            <button type="submit" className="btn">Register</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  createMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(Register);
