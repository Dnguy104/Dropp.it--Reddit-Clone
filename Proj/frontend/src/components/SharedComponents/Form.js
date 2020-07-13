import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Input from './Input.js';
import Title from './Title.js';
import Button from './Button.js';
// import { addPost } from '../../actions/posts.js';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

const Form = (props) => {
  const {
    className,
    submitHandler,
    submit,
    children,
    initialState,
    parent = null,
    md, lg, xl,
  } = props;
  const [state, setState] = useState(initialState);
  const [stateReset, toggleStateReset] = useState(false);
  const exist = useRef(true);

  let width = '200px';
  if(!!md) width = theme.size.md;
  if(!!lg) width = theme.size.lg;
  if(!!xl) width = theme.size.xl;

  const style = {
    width,
  }


  useEffect(()=>{
    return (()=>{
      exist.current = false;
    })
  }, [])

  const handleOnChange = useCallback((e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  });

  const handleOnSubmit = useCallback((e)=>{
    e.preventDefault();
    const request = { ...state, parent };
    submitHandler(request);

    if(exist.current) {
      const empty = Object.keys(state).reduce((map,obj)=>{
        map[obj] = '';
        return map;
      }, {})
      setState(empty);
    };
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
      <form onSubmit={handleOnSubmit} autoComplete="off"
        style={{
          width: width,
        }}
      >
        {inputTags}
        <div className="button-wrapper">
          <Button type="submit" invert>
            {submit}
          </Button>
        </div>
      </form>
    </div>
  );
};

const StyledForm = styled(Form)`
  .button-wrapper {
    width: ${theme.size.sm};
    height: 31px;
  }
  form {
  }
`

Form.propTypes = {
};

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps,
)(StyledForm);
