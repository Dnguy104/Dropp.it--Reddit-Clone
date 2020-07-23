import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  deletePost } from '../../actions/posts.js'
import PostCard from './PostCard.js';
import styled from 'styled-components';
import theme, { colors as Colors } from '../../utils/theme.js';

const PostCards = (props) => {
  const { className, loaded, posts, deletePost, postStyle, globalTheme } = props;

  const postCards = Object.keys(posts).map((key) => (
    <Link
      key={posts[key].slug}
      to={{
        pathname:`/r/${posts[key].id}`,
        state: {
          modal: true,
        }
      }}>
      <PostCard className={postStyle} id={posts[key].id}/>
    </Link>
  ));

  return (
    <div className={className}>
      {postCards}
    </div>
  );
}


const StyledPostCards = styled(PostCards)`
  .classic {
    &:nth-child(1) > ${PostCard} {
      border-radius: 8px 8px 0px 0px;
    }
    &:hover {
      border-color: ${Colors.white90};
    }
    border-style: solid;
    border-width: 1px;
    border-color: ${props => theme.themes[props.globalTheme].colorA};
  }
  .card {
    margin: 10px 0px;
    border-radius: 6px;
    border-color: transparent;
    border-style: solid;
    border-width: 1px;

  }
`;

PostCards.propTypes = {
  posts: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loaded: state.posts.loaded,
  postStyle: state.posts.postStyle,
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  {  }
)(StyledPostCards);
