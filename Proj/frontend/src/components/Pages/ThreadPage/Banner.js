import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title, Button } from '../../SharedComponents';
import { subThread } from '../../../actions/threads.js'
import styled from 'styled-components';
import theme from '../../../utils/theme.js';
import { AiOutlineClose } from "react-icons/ai";

const Banner = props => {
  const {
    globalTheme,
    className,
    thread,
    subThread,
    subbed
  } = props;

  const [subButtonText, setSubButtonText] = useState(subbed ? 'JOINED' : 'JOIN')

  const enterTextToggle = useCallback(()=>{
    setSubButtonText( subbed ? 'LEAVE' : 'JOIN');
  },[subbed])

  const leaveTextToggle = useCallback(()=>{
    setSubButtonText( subbed ? 'JOINED' : 'JOIN');
  },[subbed])

  const handleSub = useCallback((e)=>{
    e.stopPropagation()
    setSubButtonText( subbed ? 'JOIN' : 'LEAVE');
    subThread(thread.id)
  },[subbed])

  return (
    <div className={className}>
      <div className='panel'></div>
      <div className='header'>
        <div className='thumbnail'></div>
        <Title title={`r/${thread.title}`} style={{
          fontSize: '26px'
        }}/>
        <Button
          invert={subbed ? 'invert' : null}
          onClick={handleSub}
          onMouseEnter={enterTextToggle}
          onMouseLeave={leaveTextToggle}
          buttonStyle={{
            height: '28px',
            width: '90px',
          }}
        >
          <h3>{subButtonText}</h3>
        </Button>
      </div>
    </div>
  );
};

Banner.propTypes = {
};

const StyledBanner = styled(Banner)`
  height: auto;
  width: 100%;
  margin-bottom: 15px;
  background-color: ${props => theme.themes[props.globalTheme].element};
  ${props => props.globalTheme == 'light' ? 'box-shadow: 0px 0px 40px 0px rgba(100,100,100, 0.3), 0px 0px 20px 0px rgba(100,100,100, 0.3);' : 'box-shadow: inset 0px 0px 30px 0px rgba(200,200,200, 0.1);'}
  position: relative;
  overflow-x: hidden;

  .panel {
    background-color: #007ce8;
    box-shadow: inset 0px 0px 20px 0px rgba(200,200,200, 0.1);
    height 170px;
    width: 100%;

  }

  .header {
    display:flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    top: -27px;

    width: 960px;
    flex: 0 3 960px;
    @media only screen and (max-width: 860px) {
      width: 100%;
    }
    margin: 0px auto 15px;
    padding:10px 15px;
    box-sizing: border-box;
    ${Button} {
      margin-left: 15px;
    }
  }
  .thumbnail {
    height: 80px;
    width: 80px;
    border-radius: 40px;
    border: 2px solid white;
    background-color: rgba(100,100,100, 1);
    margin-right: 10px;
  }
`

const mapStateToProps = (state, props) => ({
  thread: state.threads.threadModels[state.threads.currentThreadId],
  globalTheme: state.global.theme,
  subbed: state.auth.user ? state.auth.user.subs.hasOwnProperty(state.threads.currentThreadId) : false
})

export default connect(
  mapStateToProps, { subThread }
)(StyledBanner);
