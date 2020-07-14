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
    render,
    collapsable,
    vote,
    depth,
    commentThreadLinks,
  } = props;

  // console.log(commentThreadLinks);
  // console.log(commentThreadLinks[-1]);

  let threadLines = [];
  if(commentThreadLinks.length > 1) {
    threadLines = commentThreadLinks.slice(0,-1).map((commentId,index)=>{
      return (
        <ThreadLine
          key={`'t'${index}'c'${commentId}`}
          commentId={commentId}
          // handleMouseEnter={}
          // handleMouseLeaver={}
        />);
    })
  }
  const lastLink = commentThreadLinks[commentThreadLinks.length-1];

  if(!!vote) {
    threadLines.push((
      <ThreadLine
        vote={vote}
        key={`'t'${depth}'c'${lastLink}`}
        commentId={lastLink}
      />
    ))
  }

  return (
    <div className={className}>
      {threadLines}
      {render()}
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
`;

const mapStateToProps = (state, props) => ({
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  {  }
)(StyledCommentThread);
