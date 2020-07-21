import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  deletePost } from '../../actions/posts.js'
import PostCard from './PostCard.js';
import styled from 'styled-components';

const PostCards = (props) => {
  const { className, loaded, posts, deletePost } = props;

  const postCards = Object.keys(posts).map((key) => (
    <Link
      key={posts[key].slug}
      to={{
        pathname:`/r/${posts[key].id}`,
        state: {
          modal: true,
        }
      }}>
      <PostCard id={posts[key].id}/>
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
  a:nth-child(2) > ${PostCard} {
    border-radius: 8px 8px 0px 0px;
  }
`;

PostCards.propTypes = {
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loaded: state.posts.loaded,
});

export default connect(
  mapStateToProps,
  {  }
)(StyledPostCards);
