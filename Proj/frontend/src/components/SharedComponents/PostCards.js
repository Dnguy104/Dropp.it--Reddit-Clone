import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, deletePost, addPost } from '../../actions/posts.js'
import PostCard from './PostCard.js';
import styled from 'styled-components';

const PostCards = (props) => {
  const { className, loaded, posts, getPosts, deletePost } = props;

  useEffect(() => {
    if(!loaded) getPosts();
  });

  const postCards = posts.map((post) => (
    <Link
      to={{
        pathname:`/r/${post.id}`,
        state: {
          modal: true,
        }
      }}>
      <PostCard id={post.id}/>
    </Link>
  ));

  return (
    <div className={className}>
      <h2>Posts</h2>
      {postCards}
    </div>
  );
}


const StyledPostCards = styled(PostCards)`
  & ${PostCard}:nth-child(2) {
    border-radius: 8px 8px 0px 0px;
  };
`;

PostCards.propTypes = {
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
)(StyledPostCards);
