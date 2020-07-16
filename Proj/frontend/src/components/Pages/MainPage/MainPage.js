import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/posts.js';
import PropTypes from 'prop-types';
import { Input, Element, Form, PostCards, Title } from '../../SharedComponents';
import RightDash from '../Components/RightDash.js';
import styled from 'styled-components';
import theme from '../../../utils/theme.js';


const MainPage = props => {
  const { className, addPost } = props;

  return (
    <>
      <div className='nav-spacer'></div>
      <div className={`${className}`}>
        <div className='left-dash'>
          <Element>
            <Title fontSize='xl' title='Add Post'/>
            <Form submitHandler={addPost} submit='Submit' lg initialState={{'title': '', 'author': '', 'content' : ''}}>
              <Input
                type="text"
                name="title"
                placeholder="Title"
              />
              <Input
                type="text"
                name="author"
                placeholder="Author"
              />
              <Input
                type="text"
                name="content"
                placeholder="Text"
                xs
                resize
                text
              />
            </Form>
          </Element>
          <PostCards />
        </div>
        <div className='right-dash'>
          <Element style={{
            height: '300px'
          }}/>
        </div>
      </div>
    </>
  );
};

MainPage.propTypes = {

};

const StyledMainPage = styled(MainPage)`
  background-color: ${props => theme.themes[props.globalTheme].background};
  height: auto;
  min-height: 100%;
  /* padding-left: 50px;
  padding-right: 50px;
  padding-top: 15px; */
  overflow: auto;
  padding: 0px 30px;
  display: flex;
  flex-dirrection: row;
  justify-content: center;

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
    flex: 0 1 600px;
    width: 600px;
  }

`
const mapStateToProps = state => ({
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { addPost }
)(StyledMainPage);
