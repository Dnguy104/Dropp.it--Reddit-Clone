import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getComments } from '../../../actions/comments.js'
import styled from 'styled-components';

const CommentSection = (props) => {
  const { className, comments, loaded } = props;

  console.log("comments: " + comments);

  // const comments = posts.map((post) => (
  //
  // ));

  return (
    <div className={className}>
    
    </div>
  );
}


const StyledCommentSection = styled(CommentSection)`

`;

CommentSection.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
  loaded: state.comments.postsLoadedIds.filter((postId)=>(state.posts.currentPostId == postId)),
});

export default connect(
  mapStateToProps,
  {  }
)(StyledCommentSection);
