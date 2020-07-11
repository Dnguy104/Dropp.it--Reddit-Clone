import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getComments } from '../../../actions/comments.js'
import Comment from './Comment.js'
import styled from 'styled-components';
import theme, { colors as Colors } from '../../../utils/theme.js';

const CommentSection = (props) => {
  const { className, comments, loaded } = props;

  console.log(comments);

  const commentList = comments.map((cmt) => (
    <Comment id={cmt.id} key={cmt.id}/>
  ));

  return (
    <div className={className}>
      {commentList}
    </div>
  );
}


const StyledCommentSection = styled(CommentSection)`
  p {
    color: ${(props) => theme.themes[props.globalTheme].colorB};
  }
`;

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
  loaded: state.comments.postsLoadedIds.filter((postId)=>(state.posts.currentPostId == postId)),
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  {  }
)(StyledCommentSection);
