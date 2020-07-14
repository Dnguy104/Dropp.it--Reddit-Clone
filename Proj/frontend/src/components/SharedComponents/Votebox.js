import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Votebox = (props) => {
  const {
    className,

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

  return (
    <div className={`${className} `} {...attr} dispatch=''>
      <div className="vote-button">
        <div className="upvote">
        </div>
      </div>
      <p>•</p>
      <div className="vote-button">
        <div className="downvote">
        </div>
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
    padding: 3px 3px 3px 2px;
    &:hover {
      box-shadow: inset 0 0 100px 100px rgba(155, 155, 155, 0.1);
    }
    &:focus {
      outline: none;
    }
  }
  .upvote, .downvote {
    height: 16px;
    width: 16px;
    background: url('/assets/vote_sm.png');
  }
  .upvote:hover {
    background-position: -31.25px 0px;
  }
  .downvote {
    background-position: -15.75px 0px;
    &:hover {
      background-position: -46.75px 0px;
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
