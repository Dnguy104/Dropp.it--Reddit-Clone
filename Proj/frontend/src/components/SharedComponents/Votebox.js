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
      <button className="upvote"></button>
      <p>•</p>
      <button className="downvote"></button>
    </div>
  );
}

const StyledVotebox = styled(Votebox)`
  /* background-color: transparent; */
  display: flex;
  flex-direction: column;
  width: fit-content;

  button {
    border-style: none;
    padding: 0;
    height: 16px;
    width: 16px;
    background: url('/assets/vote_sm.png');
    &:hover {
      pointer-events: none;
    }
  }
  .upvote {
    background-position: -32px 0px;
  }

  .upvote:hover {
    background-position: -32px 0px;

  }

  .downvote {
    background-position: -16px 0px;
    &:hover {
      background-position: -48px 0px;
    }
  }

  p {
    font-weight: 700;
    font-size: 12px;
    padding: 4px 0px;
    align-self: center;
  }
`

const mapStateToProps = (state) => ({
  globaltheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledVotebox);
