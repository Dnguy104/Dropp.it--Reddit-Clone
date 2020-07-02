import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import PostCards from '../SharedComponents/PostCards.js';
import PostForm from '../SharedComponents/PostForm.js'

const MainPage = props => {
  const { style } = props;

  return (
    <Fragment>
      <PostForm />
      <PostCards  />
    </Fragment>
  );
};

MainPage.propTypes = {

};

export default MainPage;
