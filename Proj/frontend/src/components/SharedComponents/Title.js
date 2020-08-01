import React from 'react';
import { connect } from 'react-redux';
import theme from '../../utils/theme.js';
import styled from 'styled-components';


const Title = (props) => {
  const {
    title,
    globalTheme,
    className,
    style,
    xs, sm, md, lg, xl, xxl
  } = props;

  let size = '16px';
  if(!!xs) size = theme.fontSize.xs;
  if(!!sm) size = theme.fontSize.sm;
  if(!!md) size = theme.fontSize.md;
  if(!!lg) size = theme.fontSize.lg;
  if(!!xl) size = theme.fontSize.xl;
  if(!!xxl) size = theme.fontSize.xxl;

  return (
      <StyledH1 className={className} style={style} globalTheme={globalTheme} size={size}>{title}</StyledH1>
  );
};

const StyledH1 = styled.h1`
  color: ${(props) => theme.themes[props.globalTheme].colorB};
  font-size: ${(props) => props.size};
  line-height: 20px;

`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Title);
