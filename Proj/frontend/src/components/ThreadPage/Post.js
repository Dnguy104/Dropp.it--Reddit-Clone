import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Subtitle from '../SharedComponents/Subtitle.js';

const Post = props => {
  const { post } = props;

  return (
    <>
      {post ? <Subtitle author={post.author} created_on={post.created_on}/> : null}
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.posts.posts.find(x => x.id === state.posts.currentPostId),

})

export default connect(
  mapStateToProps)(Post);
