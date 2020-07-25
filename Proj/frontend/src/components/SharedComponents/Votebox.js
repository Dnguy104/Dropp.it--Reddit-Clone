import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

export const VoteArrow = styled.div`
  height: 16px;
  width: 16px;
  background: url('/assets/vote_sm.png');
  background-position: ${props=>{
    if(props.type=='up') return '0px 0px';
    else if(props.type=='down') return '-15.75px 0px';
    else if(props.type=='upvote') return '-31.25px 0px';
    else if(props.type=='downvote') return '-46.75px 0px';
  }};

`

const Votebox = (props) => {
  const {
    className,
    noScore,
    score,
    voteState,
    id,
    handleUpvote,
    handleDownvote,
    dispatch,
    ...attr
  } = props;
  console.log(voteState)
  const [upvoteStyle, setupvoteStyle] = useState(voteState == 1 ? 'vote' : '');
  const [downvoteStyle, setdownvoteStyle] = useState(voteState == -1 ? 'vote' : '');

  const handleUpvoteHover = useCallback((val)=> () =>{
    if(voteState != 1) setupvoteStyle(val ? 'vote' : '');
  });

  const handleDownvoteHover = useCallback((val)=> () =>{
    if(voteState != -1) setdownvoteStyle(val ? 'vote' : '');
  });


  const renderScore = () => {
    if(score) {
      return (<p>{score}</p>);
    }
    return (<p>•</p>);
  };

  return (
    <div className={`${className} `} {...attr} onClick={(e)=>e.stopPropagation()}>
      <div className="vote-button" onMouseEnter={handleUpvoteHover(true)} onMouseLeave={handleUpvoteHover(false)} >
        <VoteArrow type={'up'+upvoteStyle}/>
      </div>
      {noScore ? null : renderScore()}
      <div className="vote-button"  onMouseEnter={handleDownvoteHover(true)} onMouseLeave={handleDownvoteHover(false)}>
        <VoteArrow type={'down'+downvoteStyle}/>
      </div>
    </div>
  );
}

const StyledVotebox = styled(Votebox)`
  /* background-color: transparent; */
  display: flex;
  flex-direction: column;
  width: fit-content;
  .vote-button {
    border-style: none;
    border-radius: 2px;
    padding: 4px;
    &:hover {
      box-shadow: inset 0 0 100px 100px rgba(155, 155, 155, 0.1);
    }
    &:focus {
      outline: none;
    }
  }

  p {
    font-weight: 700;
    font-size: 12px;
    padding: 12px 0px;
    align-self: center;
    color: ${(props) => {
      if(props.voteState == 0) return theme.themes[props.globaltheme].colorB;
      else if(props.voteState == 1) return '#ff4400';
      else return '#7193ff';
    }};
    line-height: 0;
  }
`

const mapStateToProps = (state) => ({
  globaltheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledVotebox);
