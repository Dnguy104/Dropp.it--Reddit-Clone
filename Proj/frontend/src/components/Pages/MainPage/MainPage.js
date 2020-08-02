import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { addPost, setPostStyle } from '../../../actions/posts.js';
import PropTypes from 'prop-types';
import { Input, Element, Form, PostCards, Title, Menu, DivMenu } from '../../SharedComponents';
import PostElement from '../Components/PostElement.js';
import TrendingElement from './TrendingElement.js';
import styled from 'styled-components';
import theme from '../../../utils/theme.js';

const MainPage = props => {
  const { globalTheme, className, user, handlePost, trending } = props;

  return (
    <>
      <div className='nav-spacer'></div>
      <div className={`${className}`}>
        <div className='left-dash'>
          {true ?
            <PostElement handlePost={handlePost}/>
            : null
          }
          <PostCards threadlink={true}/>
        </div>
        <div className='right-dash'>
          <TrendingElement/>
        </div>
      </div>
    </>
  );
};

MainPage.propTypes = {

};

const StyledMainPage = styled(MainPage)`
  background-color: ${props => theme.themes[props.globalTheme].background};
  height: fit-content;
  min-height: 100%;
  overflow: auto;
  padding: 0px 30px;
  display: flex;
  flex-dirrection: row;
  justify-content: center;
  box-sizing: border-box;

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

  &.fixed {
    overflow: hidden;
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
});

export default connect(
  mapStateToProps
)(StyledMainPage);
