import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Posts from '../Posts/Posts.js';
import PostForm from '../PostForm/PostForm.js'

const Dashboard = props => {
  const { style } = props;

  return (
    <Fragment>
      <PostForm />
      <Posts  />
    </Fragment>
  );
};

Dashboard.propTypes = {

};

export default Dashboard;
