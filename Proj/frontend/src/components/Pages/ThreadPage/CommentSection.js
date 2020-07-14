import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/comments.js'
import Comment from './Comment.js'
import CommentThread from './CommentThread.js'
import { Form, Input } from '../../SharedComponents';
import styled from 'styled-components';
import theme, { colors as Colors } from '../../../utils/theme.js';

const CommentSection = (props) => {
  const { className, comments, loaded, addComment } = props;

  // console.log("comment section: " );
  // console.log(comments);
  let commentThreadLinks = [];

  const commentList = Object.keys(comments).map((key) => {
    const comment = comments[key];
    while(commentThreadLinks.length >= comment.depth) commentThreadLinks.pop();
    commentThreadLinks.push(comment.id);

    if(comment.commentForm) {
      return ([
        <CommentThread
          depth={comment.depth}
          collapsable
          vote
          commentThreadLinks={[...commentThreadLinks]}
          key={comment.id}
          render={()=>(
            <Comment id={comment.id}/>
          )}
        ></CommentThread>,
        <CommentThread
          depth={comment.depth}
          commentThreadLinks={[...commentThreadLinks]}
          key={comment.id}
          render={()=>(
            <Form submitHandler={addComment}
              submit='Comment'
              xl
              key={'f'+comment.id}
              parent={comment.id}
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
            </Form>
          )}
        ></CommentThread>
      ]);
    }
    return (
      <CommentThread
        depth={comment.depth}
        collapsable
        vote
        commentThreadLinks={[...commentThreadLinks]}
        key={comment.id}
        render={()=><Comment id={comment.id} />}
      ></CommentThread>
    );
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
