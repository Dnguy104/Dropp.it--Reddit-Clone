import React from 'react';
import { connect } from 'react-redux';
import theme from '../../utils/theme.js';
import styled from 'styled-components';


const Title = (props) => {
  const {
    title,
    className,
    fontSize, // 'sm','md','lg' ...
  } = props;

  return (
      <h1 className={className}>{title}</h1>
  );
};

const StyledTitle = styled(Title)`
  color: ${(props) => theme.themes[props.globalTheme].colorB};
  font-size: ${(props) => theme.fontSize[props.fontSize]};
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledTitle);
