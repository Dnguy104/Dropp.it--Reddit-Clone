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
    style,
    ...rest
  } = props
  return (
    <div
      {...rest} // `children` is just another prop!
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
      style={{
        cursor: 'pointer',
        ...style
      }}
    />
  )
}
export const LinkDiv = withRouter(Link)

const PostCards = (props) => {
  const { className, loaded, posts, deletePost, postStyle, globalTheme, threads, threadlink } = props;

  const postCards = Object.keys(posts).map((key) => {
    const thread = Object.keys(threads).length ? threads[posts[key].thread].title : null;

    return (<LinkDiv
      key={posts[key].slug}
      to={{
        pathname:`/r/${thread}/${posts[key].id}`,
        state: {
          modal: true,
        },
        threadId: posts[key].thread
      }}>
      <PostCard id={posts[key].id} threadlink={!!threadlink}/>
    </LinkDiv>)
  });

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
  box-sizing: border-box;
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
  threads: state.threads.threadModels,
  loaded: state.posts.loaded,
  postStyle: state.posts.postStyle,
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  {  }
)(StyledPostCards);
