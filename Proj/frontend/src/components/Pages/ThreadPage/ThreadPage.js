import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { addPost, setPostStyle } from '../../../actions/posts.js';
import PropTypes from 'prop-types';
import {  PostCards } from '../../SharedComponents';
import PostElement from '../Components/PostElement.js';
import styled from 'styled-components';
import theme from '../../../utils/theme.js';

const ThreadPage = props => {
  const { globalTheme, className, user, handlePost, } = props;

  return (
    <>
      <div className='nav-spacer'></div>
      <div className={`${className}`}>
        <div className='left-dash'>
          {true ?
            <PostElement handlePost={handlePost}/>
            : null
          }
          <PostCards />
        </div>
        <div className='right-dash'>

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
  /* padding-left: 50px;
  padding-right: 50px;
  padding-top: 15px; */
  overflow: auto;
  padding: 0px 30px;
  display: flex;
  flex-dirrection: row;
  justify-content: center;


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
});

export default connect(
  mapStateToProps
)(StyledThreadPage);
