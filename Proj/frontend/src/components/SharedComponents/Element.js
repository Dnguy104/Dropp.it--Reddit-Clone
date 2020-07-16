import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Element = (props) => {
  const { globalTheme, style } = props;

  return (
    <StyledElement globalTheme={globalTheme} style={style}>
      {props.children}
    </StyledElement>
  );
}

const StyledElement = styled.div`
  border-radius: 8px;
  border-style: solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  border-width: 2px;
  padding: 10px;
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Element);
