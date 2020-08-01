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
  border-style: none;
  background-color: ${props => theme.themes[props.globalTheme].element};
  ${props => props.globalTheme == 'light' ? 'box-shadow: 0px 0px 30px 5px rgba(100,100,100, 0.4);' : 'box-shadow: inset 0px 0px 30px 0px rgba(200,200,200, 0.1);'}
  padding: 10px;
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Element);
