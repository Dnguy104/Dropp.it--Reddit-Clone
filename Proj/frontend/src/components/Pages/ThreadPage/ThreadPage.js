import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { addPost, setPostStyle } from '../../../actions/posts.js';
import PropTypes from 'prop-types';
import { PostCards } from '../../SharedComponents';
import PostElement from '../Components/PostElement.js';
import Banner from './Banner.js';
import AboutElement from '../Components/AboutElement.js';
import styled from 'styled-components';
import theme from '../../../utils/theme.js';

const ThreadPage = props => {
  const { globalTheme, className, user, handlePost, thread} = props;

  return (
    <>
      <Banner />
      <div className={`${className}`}>
        <div className='left-dash'>
          {true ?
            <PostElement handlePost={handlePost} />
            : null
          }
          <PostCards />
        </div>
        <div className='right-dash'>
          <AboutElement threadId={thread.id} handlePost={handlePost} />
        </div>
      </div>
    </>
  );
};

ThreadPage.propTypes = {

};

const StyledThreadPage = styled(ThreadPage)`
  background-color: ${props => theme.themes[props.globalTheme].background};
  height: fit-content;
  min-height: 100%;

  overflow: auto;
  padding: 0px 30px;
  display: flex;
  flex-dirrection: row;
  justify-content: center;

  @media only screen and (max-width: 860px) {
    padding: 0px 5px;

    .right-dash {
      display: none
    }

    .left-dash {
      flex: 0;
      width: 100%;
    }
  }


  .right-dash {
    background-color: transparent;
    flex: 0 0 300px;
    height: auto;
    width: 300px;
    margin-left: 15px;
  }
  .left-dash {
    background-color: transparent;
    flex: 0 1 640px;
    width: 640px;
  }

`
const mapStateToProps = state => ({
  globalTheme: state.global.theme,
  user: state.auth.user,
  thread: state.threads.threadModels[state.threads.currentThreadId]
});

export default connect(
  mapStateToProps
)(StyledThreadPage);
