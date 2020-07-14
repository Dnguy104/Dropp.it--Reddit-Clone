import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCommentThreadHover, handleCommentThreadOff } from '../../../actions/comments.js';
import styled from 'styled-components';
import { Votebox } from '../../SharedComponents';
import theme from '../../../utils/theme.js';

const ThreadLine = (props) => {
  const {
    className,
    render,
    vote,
    comment,
    commentId,
    handleCommentThreadHover,
    handleCommentThreadOff
  } = props;

  // console.log(commentId);
  // console.log(comment)

  const lineStyle = vote ? 'voteline' : '';
  const hoverStyle = comment.threadHover ? 'hover' : '';

  return (
    <div className={className}>
      {vote ?
      (
        <Votebox/>
      ) : null}
      <div className={`line ${lineStyle} ${hoverStyle}`}
        onMouseEnter={handleCommentThreadHover(comment)}
        onMouseLeave={handleCommentThreadOff(comment)}
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
  margin: 0px 5px;
  .line {
    width: 10px;
    height: 100%;
    border-right-style: solid;
    border-right-color: ${({globalTheme}) => theme.themes[globalTheme].colorA};
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
    width: 10px;   // calc(50% - 1px);
    margin-top: 5px;
    align-self: flex-start
  }

`;

const mapStateToProps = (state, props) => ({
  comment: state.comments.comments[props.commentId],
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  { handleCommentThreadHover, handleCommentThreadOff }
)(StyledThreadLine);
