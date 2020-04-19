import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Post from '../Post/Post.js';
import PostForm from '../PostForm/PostForm.js'

const Dashboard = props => {
  return (
    <Fragment>
      <PostForm />
      <Post />
    </Fragment>
  );
};

Dashboard.propTypes = {

};

export default Dashboard;
