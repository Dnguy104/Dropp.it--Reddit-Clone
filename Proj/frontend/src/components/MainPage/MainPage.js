import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/posts.js';
import PropTypes from 'prop-types';
import PostCards from '../SharedComponents/PostCards.js';
import PostForm from '../SharedComponents/PostForm.js'
import Element from '../SharedComponents/Element.js';
import Input from '../SharedComponents/Input.js';

import styled from 'styled-components';
import theme from '../../utils/theme.js';


const MainPage = props => {
  const { className, addPost } = props;
  
  return (
    <div className={`${className}`}>
      <Element>
        <PostForm submitHandler={addPost} submit='Submit'>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            lg
          />
          <Input
            type="text"
            name="author"
            placeholder="Author"
            lg
          />
          <Input
            type="text"
            name="content"
            placeholder="Text"
            lg
            resize
            text
          />
        </PostForm>
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
