import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Button = (props) => {
  const {
    className,
    children,
    invert,
    ...attr
   } = props;
   console.log(attr)
   let color = 'default';
   if(!!invert) color = 'invert';

  return (
    <button className={`${className} ${color}`} {...attr}>
      {children}
    </button>
  );
}

const StyledButton = styled(Button)`
  border-style: none;
  border-radius: 5px;
  background-color: ${props => theme.themes[props.globalTheme].colorB};
  color: ${props => theme.themes[props.globalTheme].element};
  height: 100%;
  width: 100%;

  &.invert {
    background-color: ${props => theme.themes[props.globalTheme].element};
    color: ${props => theme.themes[props.globalTheme].colorB};
    border-style: solid;
    border-color: ${props => theme.themes[props.globalTheme].colorB};
    border-width: 1px;
  }

`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledButton);
