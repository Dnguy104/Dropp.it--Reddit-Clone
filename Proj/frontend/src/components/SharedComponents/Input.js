import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Input = (props) => {
  const {
    globalTheme,
    ...attr
   } = props;

  return (
    <StyledInput globalTheme={globalTheme} {...attr} >
      {props.children}
    </StyledInput>
  );
}

const StyledInput = styled.input`
  border-radius: 8px;
  border-style: solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  border-width: 2px;

`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Input);
