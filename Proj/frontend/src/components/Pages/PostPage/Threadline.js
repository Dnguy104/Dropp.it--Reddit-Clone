import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCommentCollapse } from '../../../actions/comments.js';
import { handleUpvote, handleDownvote } from '../../../actions/votes.js';
import styled from 'styled-components';
import { Votebox } from '../../SharedComponents';
import theme from '../../../utils/theme.js';

const ThreadLine = (props) => {
  const {
    className,
    vote,
    commentId,
    comment,
    threadHover,
    updateCommentThreadView,
    handleCommentCollapse,
    handleUpvote,
    handleDownvote
  } = props;

  // console.log(threadHover);

  const lineStyle = vote ? 'voteline' : '';
  const hoverStyle = threadHover ? 'hover' : '';

  return (
    <div className={className}>
      {vote ?
      (
        <Votebox noScore voteState={comment.votestate} handleUpvote={handleUpvote(comment.post, comment.id)} handleDownvote={handleDownvote(comment.post, comment.id)}/>
      ) : null}
      <div className={`line ${lineStyle} ${hoverStyle}`}
        onMouseEnter={updateCommentThreadView(commentId, true)}
        onMouseLeave={updateCommentThreadView(commentId, false)}
        onClick={handleCommentCollapse(commentId)}
      >
      </div>
    </div>
  );
}

ThreadLine.propTypes = {

};

const StyledThreadLine = styled(ThreadLine)`
  display: flex;
  flex-direction: column;
  margin-right: 5px;
  .line {
    width: 11.25px;
    height: 100%;
    border-right-style: solid;
    border-right-color: rgba(100,100,100, 0.3);
    border-right-width: 2px;
    align-self: base-line;
    /* &:hover {
      border-right-color: ${({globalTheme}) => theme.themes[globalTheme].colorB};
    } */
  }
  .hover {
    border-right-color: ${({globalTheme}) => theme.themes[globalTheme].colorB};
  }

  .voteline {
    width: 11.25px;   // calc(50% - 1px);
    margin-top: 5px;
    align-self: flex-start
  }

`;

const mapStateToProps = (state, props) => ({
  globalTheme: state.global.theme,
  comment: state.comments.commentModels[props.commentId]
});


export default connect(
  mapStateToProps,
  { handleCommentCollapse, handleUpvote, handleDownvote }
)(StyledThreadLine);
