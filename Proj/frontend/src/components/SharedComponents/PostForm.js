import React, { useState, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Input from './Input.js';
import Title from './Title.js';
// import { addPost } from '../../actions/posts.js';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

const PostForm = (props) => {
  const {
    className,
    submitHandler,
    submit,
    children
  } = props;
  const [state, setState] = useState({});
  const [stateReset, toggleStateReset] = useState(false);

  useLayoutEffect(()=>{
    setState(
      children.reduce((map, obj)=>{
        map[obj.props.name] = '';
        return map;
      }, {})
    )
  }, [])


  const handleOnChange = useCallback((e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  });

  const handleOnSubmit = useCallback((e)=>{
    e.preventDefault();
    const request = { ...state };
    submitHandler(request);

  },[state]);

  const inputTags = React.Children.map(
    children,
    (child, i) => {
      return React.cloneElement(child, {
        onChange: handleOnChange,
        value: state[child.props.name]
      });
  });

  return (
    <div className={className}>
      <Title fontSize='xl' title='Add Post'/>
      <form onSubmit={handleOnSubmit} autoComplete="off" >
        {inputTags}
        <button type="submit" >
          {submit}
        </button>
      </form>
    </div>
  );
};

const StyledPostForm = styled(PostForm)`

`

PostForm.propTypes = {
};

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps,
)(StyledPostForm);
