import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Input from './Input.js';
import Title from './Title.js';
import { addPost } from '../../actions/posts.js';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

const PostForm = (props) => {
  const { addPost, className } = props;
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleOnChange = useCallback((e)=>{
    if(e.target.name == 'author') setAuthor(e.target.value);
    else if(e.target.name == 'content') setContent(e.target.value);
    else if(e.target.name == 'title') setTitle(e.target.value);
  });

  const handleOnSubmit = useCallback((e)=>{
    e.preventDefault();
    const post = { author, content, title, threadid: 2 };
    addPost(post);

    setAuthor('');
    setContent('');
    setTitle('');
  },[author, content, title]);

  return (
    <div className={className}>
      <Title fontSize='xl' title='Add Post'/>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleOnChange}
            value={title}
          >
          </Input>
        </div>
        <div className="form-group">
          <Input
            type="text"
            name="author"
            placeholder="Author"
            onChange={handleOnChange}
            value={author}
          >
          </Input>
        </div>
        <div className="form-group">
          <Input
            type="text"
            name="content"
            placeholder="Text"
            onChange={handleOnChange}
            value={content}
          >
          </Input>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const StyledPostForm = styled(PostForm)`

`

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps,
  { addPost }
)(StyledPostForm);
