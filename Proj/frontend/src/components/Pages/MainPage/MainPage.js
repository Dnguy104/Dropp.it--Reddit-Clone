import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../../actions/posts.js';
import PropTypes from 'prop-types';
import { Input, Element, Form, PostCards, Title } from '../../SharedComponents';

import styled from 'styled-components';
import theme from '../../../utils/theme.js';


const MainPage = props => {
  const { className, addPost } = props;

  return (
    <div className={`${className}`}>
      <div className='nav-spacer'></div>
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
  );
};

MainPage.propTypes = {

};

const StyledMainPage = styled(MainPage)`
  background-color: ${props => theme.themes[props.globalTheme].background};
  height: auto;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 15px;
  overflow: auto;

  &.fixed {
    overflow: hidden;
  }

`
const mapStateToProps = state => ({
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { addPost }
)(StyledMainPage);
