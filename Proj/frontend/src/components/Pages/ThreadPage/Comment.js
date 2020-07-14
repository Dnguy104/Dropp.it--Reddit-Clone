import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCommentReplyToggle } from '../../../actions/comments.js';
import styled from 'styled-components';
import { Subtitle, Button } from '../../SharedComponents';
import theme, { colors as Colors } from '../../../utils/theme.js';
import ThreadLine from './ThreadLine.js';
// import { setPost } from '../../actions/posts.js'

const Comment = (props) => {
  const { className,
    comment,
    handleCommentReplyToggle,
    updateCommentThreadView,
    commentThreadView,
  } = props;
    // console.log(comment);
    // console.log("comment");

  return (
    <div className={className} >
      <ThreadLine
        vote={true}
        key={`'t'${comment.depth}'c'${comment.id}`}
        commentId={comment.id}
        threadHover={commentThreadView.threadHover}
        updateCommentThreadView={updateCommentThreadView}
      />
      <div className='content-container'>
        <Subtitle author={comment.author} created_on={comment.created_on}/>
        <p>
          {comment.content}
        </p>
        <p>
          {comment.depth}
        </p>
        <div>
          <Button onClick={handleCommentReplyToggle(comment.id)} icon>Reply</Button>
          <Button icon>Reply</Button>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {

};

const StyledComment = styled(Comment)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 7px;
  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
  }

`;

const mapStateToProps = (state, props) => ({
  comment: state.comments.comments[props.commentThreadView.id],
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  { handleCommentReplyToggle }
)(StyledComment);
