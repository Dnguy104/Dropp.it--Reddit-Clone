import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostHeader from './PostHeader.js';
import PostFooter from './PostFooter.js';
import './Post.css';

const Post = (props) => {
  const { post, style } = props;
  const postStyle = style ? style : 'classic';

  return (
    <div className={postStyle}>
      <PostHeader title={post.title} author={post.author} created_on={post.created_on} />
      <PostFooter/>
    </div>
  );
}

Post.propTypes = {

};

const mapStateToProps = (state, props) => ({
  post: state.posts.posts.find(x => x.id === props.id)
});

export default connect(
  mapStateToProps
)(Post);
