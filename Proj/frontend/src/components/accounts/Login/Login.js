import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth.js'

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    const { username, password } = this.state;

    return (
      <div className="form-ctn">
        <div className="form-card">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.onSubmit}>
            <label>Username</label>
            <input
              type="text"
              className="form-input"
              name="username"
              onChange={this.onChange}
              value={username}
            />
            <label>Password</label>
            <input
              type="text"
              className="form-input"
              name="password"
              onChange={this.onChange}
              value={password}
            />
            <button type="submit" className="btn">Login</button>
            <p>
              Dont have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
