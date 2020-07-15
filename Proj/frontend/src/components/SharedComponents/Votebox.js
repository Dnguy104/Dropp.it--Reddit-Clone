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
  /* .up.hover {
    background-position: -31.25px 0px;
  }
  .down {
    background-position: -15.75px 0px;
    &.hover {
      background-position: -46.75px 0px;
    }
  } */
`

const Votebox = (props) => {
  const {
    className,
    noScore,
    ...attr
   } = props;

   // let color = '';
   // if(!!invert) color = 'invert';
   //
   // let iconStyle = '';
   // if(!!icon) iconStyle = 'icon';

   // let height = '31px';
   // if(!!xs) height = theme.size.xs;
   // if(!!sm) height = theme.size.sm;
   // if(!!md) height = theme.size.md;
   // if(!!lg) height = theme.size.lg;
   // if(!!xl) height = theme.size.xl;
   const [upvoteStyle, setupvoteStyle] = useState('');
   const [downvoteStyle, setdownvoteStyle] = useState('');
   const handleVote = useCallback((setter, val)=> () =>{
       setter((prev)=>{
         return val ? 'vote' : '';
       })
     });



  return (
    <div className={`${className} `} {...attr} dispatch=''>
      <div className="vote-button" onMouseEnter={handleVote(setupvoteStyle, true)} onMouseLeave={handleVote(setupvoteStyle, false)} >
        <VoteArrow type={'up'+upvoteStyle}/>
      </div>
      {noScore ? null : <p>•</p>}
      <div className="vote-button"  onMouseEnter={handleVote(setdownvoteStyle, true)} onMouseLeave={handleVote(setdownvoteStyle, false)}>
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
    padding: 8px 0px;
    align-self: center;
    color: ${(props) => theme.themes[props.globaltheme].colorB};
    line-height: 0;
  }
`

const mapStateToProps = (state) => ({
  globaltheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledVotebox);
