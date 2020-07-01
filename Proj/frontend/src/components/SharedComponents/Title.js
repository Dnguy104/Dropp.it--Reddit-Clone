import React from 'react';
import { connect } from 'react-redux';
import theme from '../../utils/theme.js';
import styled from 'styled-components';


const Title = styled.h3`
  color: ${({globalTheme}) => theme.themes[globalTheme].colorA};
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Title);
