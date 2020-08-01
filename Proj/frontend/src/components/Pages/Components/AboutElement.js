import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../../utils/theme.js';
import { Element, Title, Button } from '../../SharedComponents';
import { subThread } from '../../../actions/threads.js'
import styled from 'styled-components';
import { GiCakeSlice } from "react-icons/gi";

const AboutElement = (props) => {
  const {
    className,
    globalTheme,
    thread,
    subThread,
    subbed,
   } = props;
  const [subButtonText, setSubButtonText] = useState(subbed ? 'JOINED' : 'JOIN')
  const enterTextToggle = useCallback(()=>{
    setSubButtonText( subbed ? 'LEAVE' : 'JOIN');
  },[subbed])

  const leaveTextToggle = useCallback(()=>{
    setSubButtonText( subbed ? 'JOINED' : 'JOIN');
  },[subbed])

  const handleSub = useCallback(()=>{
    setSubButtonText( subbed ? 'JOIN' : 'LEAVE');
    subThread(thread.id)
  },[subbed])

  return (
    <Element className={className} globalTheme={globalTheme} style={{
      padding: '0px',
      overflow: 'hidden',
    }}>
      <div className='panel'></div>
        <div className='about-conatainer'>
          <div className='header'>
            <div className='thumbnail'></div>
            <Title title={`r/${thread.title}`} lg/>
          </div>
          <div className='about'>
            <p>{thread.about}</p>
          </div>
          <div className='created'>
            <GiCakeSlice/>
            <Title className='text-icon' title={`Created ${thread.created_on}`} md/>
          </div>
          <Button
            invert={subbed ? 'invert' : null}
            onClick={handleSub}
            onMouseEnter={enterTextToggle}
            onMouseLeave={leaveTextToggle}
            buttonStyle={{
              height: '35px',
              margin: '10px 0px'
            }}
          >
            <h3>{subButtonText}</h3>
          </Button>
      </div>
    </Element>
  );
}

const StyledAboutElement = styled(AboutElement)`
  h3 {
    font-size: 14px;
    font-weight: 700;
  }

  p {
    font-size: 14px;
    color: ${(props) => theme.themes[props.globalTheme].colorC};
  }
  .about {
    padding: 10px 0px;
    border-bottom: 1px solid ${(props) => theme.themes[props.globalTheme].colorB};
    margin-bottom: 15px;
  }
  .about-conatainer {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: auto;
  }
  .header {
    display:flex;
    flex-direction: row;
    align-items: center;
    margin-botton: 15px;
  }
  .thumbnail {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    background-color: rgba(100,100,100, 0.3);
    margin-right: 10px;
  }
  .panel {
    background-color: #007ce8;
    box-shadow: inset 0px 0px 20px 0px rgba(200,200,200, 0.1);
    height 45px;
    width: 100%;
  }
  .created {
    display: flex;
    flex-direction: row;
  }
  .text-icon {
    padding-left: 5px;
  }
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
  thread: state.threads.threadModels[state.posts.posts[state.posts.currentPostId].thread],
  subbed: state.auth.user ? state.auth.user.subs.hasOwnProperty(state.posts.posts[state.posts.currentPostId].thread) : false
});

export default connect(mapStateToProps, { subThread })(StyledAboutElement);
