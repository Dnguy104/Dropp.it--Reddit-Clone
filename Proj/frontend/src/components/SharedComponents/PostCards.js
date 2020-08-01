import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {  deletePost } from '../../actions/posts.js'
import PostCard from './PostCard.js';
import styled from 'styled-components';
import theme, { colors as Colors } from '../../utils/theme.js';

const Link = (props) => {
  const {
    history,
    location,
    match,
    to,
    staticContext,
    onClick,
    ...rest
  } = props
  return (
    <div
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
    />
  )
}
const LinkDiv = withRouter(Link)

const PostCards = (props) => {
  const { className, loaded, posts, deletePost, postStyle, globalTheme } = props;

  const postCards = Object.keys(posts).map((key) => (
    <LinkDiv
      key={posts[key].slug}
      to={{
        pathname:`/r/${posts[key].id}`,
        state: {
          modal: true,
        }
      }}>
      <PostCard id={posts[key].id}/>
    </LinkDiv>
  ));

  return (
    <div className={className}>
      {postCards}
    </div>
  );
}


const StyledPostCards = styled(PostCards)`
  div:nth-of-type(1) > .classic {
    border-radius: 8px 8px 0px 0px;

  }
  height: initial;
  .classic {
    &:hover {
      border-color: ${Colors.white90};
    }
    border-style: solid;
    border-width: 1px;
    border-color: transparent;
  }
  .card {
    margin: 10px 0px;
    border-radius: 6px;
    border-style: none;


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
