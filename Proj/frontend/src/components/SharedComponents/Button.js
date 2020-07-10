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
    <button className={`${className} ${color}`} dispatch='' {...attr}>
      {children}
    </button>
  );
}

const StyledButton = styled(Button)`
  border-style: none;
  border-radius: var(--b-radius);
  background-color: ${props => theme.themes[props.globaltheme].colorB};
  color: ${props => theme.themes[props.globaltheme].element};
  height: 100%;
  width: 100%;

  &.invert {
    background-color: ${props => theme.themes[props.globaltheme].element};
    color: ${props => theme.themes[props.globaltheme].colorB};
    border-style: solid;
    border-color: ${props => theme.themes[props.globaltheme].colorB};
    border-width: 1px;
  }

`

const mapStateToProps = (state) => ({
  globaltheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledButton);
