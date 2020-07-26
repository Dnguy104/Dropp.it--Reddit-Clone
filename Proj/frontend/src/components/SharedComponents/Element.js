import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Element = (props) => {
  const { globalTheme, style, className, ...attr } = props;

  return (
    <StyledElement className={className} globalTheme={globalTheme} style={style} {...attr}>
      {props.children}
    </StyledElement>
  );
}

const StyledElement = styled.div`
  border-radius: 8px;
  border-style: solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: transparent;
  box-shadow: inset 0px 0px 20px 0px rgba(200,200,200, 0.2);
  border-width: 1px;
  padding: 10px;
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Element);
