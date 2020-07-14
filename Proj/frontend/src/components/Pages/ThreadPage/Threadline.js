import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCommentReplyToggle } from '../../../actions/comments.js';
import styled from 'styled-components';
import { Votebox } from '../../SharedComponents';
import theme from '../../../utils/theme.js';

const ThreadLine = (props) => {
  const { className, render, vote} = props;

  const lineStyle = vote ? 'voteline' : ''

  return (
    <div className={className}>
      {vote ?
      (
        <Votebox/>
      ) : null}
      <div className={`line ${lineStyle}`}></div>
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

  .voteline {
    width: 10px;   // calc(50% - 1px);
    align-self: flex-start
  }

`;

const mapStateToProps = (state, props) => ({
  comment: state.comments.comments[props.id],
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  {  }
)(StyledThreadLine);
