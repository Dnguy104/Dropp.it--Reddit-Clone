import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, deletePost, addPost } from '../../actions/posts.js'
import Post from '../Post/Post.js';
import styled from 'styled-components';

const Posts = (props) => {
  const { className, loaded, posts, getPosts, deletePost } = props;

  useEffect(() => {
    if(!loaded) getPosts();
  });

  const postCards = posts.map((post) => (
    <Post id={post.id}/>
  ));

  return (
    <div className={className}>
      <h2>Posts</h2>
      {postCards}
    </div>
  );
}


const StyledPosts = styled(Posts)`
  & ${Post}:nth-child(2) {
    border-radius: 8px 8px 0px 0px;
  };
`;

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
)(StyledPosts);
