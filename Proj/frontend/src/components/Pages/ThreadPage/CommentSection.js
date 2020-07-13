import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/comments.js'
import Comment from './Comment.js'
import { Form, Input } from '../../SharedComponents';
import styled from 'styled-components';
import theme, { colors as Colors } from '../../../utils/theme.js';

const CommentSection = (props) => {
  const { className, comments, loaded, addComment } = props;

  // console.log("comment section: " );
  // console.log(comments);

  const commentList = Object.keys(comments).map((key) => {
    if(comments[key].commentForm) {
      return (
          [<Comment id={comments[key].id} key={comments[key].id}/>,
          <Form submitHandler={addComment}
            submit='Comment'
            xl
            key={'f'+comments[key].id}
            parent={comments[key].id}
            initialState={{'content': ''}}
          >
            <Input
              type="text"
              name="content"
              placeholder="What are your thought?"
              xs
              resize
              text
            />
          </Form>]
      );
    }
    return <Comment id={comments[key].id} key={comments[key].id}/>
  });

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
  comments: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  comments: state.comments.comments,
  loaded: state.comments.postsLoadedIds.filter((postId)=>(state.posts.currentPostId == postId)),
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { addComment }
)(StyledCommentSection);
