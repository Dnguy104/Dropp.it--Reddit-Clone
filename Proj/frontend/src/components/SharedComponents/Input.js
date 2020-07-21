import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Input = (props) => {
  const {
    globalTheme,
    resize,
    xs, sm, md, lg, xl,
    text,
    light,
    ...attr
   } = props;

   let height = '31px';
   if(!!xs) height = theme.size.xs;
   if(!!sm) height = theme.size.sm;
   if(!!md) height = theme.size.md;
   if(!!lg) height = theme.size.lg;
   if(!!xl) height = theme.size.xl;

   const style = { height, light};
   let InputElement = 'input';
   if(!!text) InputElement = 'textarea';

  return (
    <Styleddiv globalTheme={globalTheme} {...style}>
      <InputElement {...attr} dispatch="">
      </InputElement>
    </Styleddiv>
  );
}

const Styleddiv = styled.div`
  margin-top: 10px;
  margin-bottom:10px;

  * {
    border-radius: var(--b-radius);
    border-style: none;
    box-sizing: border-box;
    background-color:${({light}) => light ? 'rgb(0,0,0,0.1)' : 'rgb(0,0,0,0.4)'};
    opacity:  0.8;
    border-color: ${props => theme.themes[props.globalTheme].colorA};
    border-width: 2px;
    color: ${props => theme.themes[props.globalTheme].colorA};
    resize: ${({resize}) => resize ? 'vertical' : 'none'};
    width: 100%;
    height: ${({height}) => height};
    padding-left: 10px;
  }

  textarea {
    padding-top: 10px;
  }
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Input);
