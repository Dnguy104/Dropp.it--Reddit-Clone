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
    commentId
  } = props;

  let threadLines = [...Array(depth-1)].map((i,index)=>{
    return (<ThreadLine key={`'t'${index}'c'${commentId}`}/>);
  })
  if(!!vote) {
    threadLines.push((
      <ThreadLine vote={vote} key={`'t'${depth}'c'${commentId}`}/>
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
  comment: state.comments.comments[props.id],
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  {  }
)(StyledCommentThread);
