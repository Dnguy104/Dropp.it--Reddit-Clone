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
    buttonStyle,
    icon,
    ...attr
   } = props;

   let color = '';
   if(!!invert) color = 'invert';

   let iconStyle = '';
   if(!!icon) iconStyle = 'icon';

   // let height = '31px';
   // if(!!xs) height = theme.size.xs;
   // if(!!sm) height = theme.size.sm;
   // if(!!md) height = theme.size.md;
   // if(!!lg) height = theme.size.lg;
   // if(!!xl) height = theme.size.xl;

  return (
    <button
      className={`${className} ${color} ${iconStyle}`}
      {...attr}
      style={buttonStyle}
      dispatch=''
    >
      {children}
    </button>
  );
}

const StyledButton = styled(Button)`
  border-style: none;
  border-radius: var(--b-radius);
  background-color: ${props => theme.themes[props.globaltheme].highlight};
  color: ${props => theme.themes[props.globaltheme].element};
  height: 100%;
  width: 100%;
  padding: 0px 10px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &.icon {
    height: 25px;
    width: auto;
    line-height: 0;
    font-weight: 800;
    font-size: 11px;
    padding: 5px 5px;
    color: ${props => theme.themes[props.globaltheme].colorC};
    background-color: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      padding-left: 5px;
      color: ${props => theme.themes[props.globaltheme].colorC};
    }
  }

  &.invert {
    background-color: transparent;
    color: ${props => theme.themes[props.globaltheme].highlight};
    border-style: solid;
    border-color: ${props => theme.themes[props.globaltheme].highlight};
    border-width: 1px;
  }

`

const mapStateToProps = (state) => ({
  globaltheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledButton);
