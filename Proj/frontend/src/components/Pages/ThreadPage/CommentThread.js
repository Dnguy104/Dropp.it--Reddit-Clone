import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCommentReplyToggle } from '../../../actions/comments.js';
import styled from 'styled-components';
import ThreadLine from './ThreadLine.js';
import theme from '../../../utils/theme.js';

const CommentThread = (props) => {
  const {
    className,
    renderComment,
    vote,
    depth,
    commentThreadLinks,
    updateCommentThreadView,
  } = props;

  const renderThreadLines = () => {
    return commentThreadLinks.slice(0,-1).map((commentThreadView,index)=>{
      return (
        <ThreadLine
          key={`'t'${index}'c'${commentThreadView.id}`}
          commentId={commentThreadView.id}
          threadHover={commentThreadView.threadHover}
          updateCommentThreadView={updateCommentThreadView}
        />);
    })
  }

  return (
    <div className={className}>
      {commentThreadLinks.length > 1 ? renderThreadLines() : null}
      {renderComment()}
    </div>
  );
}

CommentThread.propTypes = {

};

const StyledCommentThread = styled(CommentThread)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0px 4px;
  
  box-sizing: content-box;
`;

const mapStateToProps = (state, props) => ({
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  {  }
)(StyledCommentThread);
