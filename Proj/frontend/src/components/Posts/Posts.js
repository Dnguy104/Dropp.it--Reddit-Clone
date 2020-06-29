import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, deletePost, addPost } from '../../actions/posts.js'
import Post from '../Post/Post.js';

const Posts = (props) => {
  const { loaded, posts, getPosts, deletePost } = props;
  console.log(loaded);
  useEffect(() => {
    if(!loaded) getPosts();
  });

  const postCards = posts.map((post) => (
    <Post id={post.id}/>
  ));

  return (
    <>
      <h2>Posts</h2>
      {postCards}
    </>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loaded: state.posts.loaded,
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(Posts);
