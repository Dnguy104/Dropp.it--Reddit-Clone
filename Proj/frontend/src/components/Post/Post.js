import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostHeader from './PostHeader.js';
import PostFooter from './PostFooter.js';
import styled from 'styled-components';

const Post = (props) => {
  const { className, post, style } = props;
  const postStyle = style ? style : 'classic';

  return (
    <div className={className}>
      <PostHeader title={post.title} author={post.author} created_on={post.created_on} />
      <PostFooter/>
    </div>
  );
}

Post.propTypes = {

};

const StyledPost = styled(Post)`
  border-style: solid;
  border-color: white;
  border-width: 1px;
  padding: 10px;
`;

const mapStateToProps = (state, props) => ({
  post: state.posts.posts.find(x => x.id === props.id)
});

export default connect(
  mapStateToProps
)(StyledPost);
