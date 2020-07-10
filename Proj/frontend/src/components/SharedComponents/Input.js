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
    ...attr
   } = props;

   let width = '100px';
   if(!!sm) width = theme.size.sm;
   if(!!md) width = theme.size.md;
   if(!!lg) width = theme.size.lg;
   if(!!xl) width = theme.size.xl;

   let height = '31px';
   if(resize) height = theme.size.sm;
   // let height = '20px';
   // if(!!sh) height = '40px';
   // if(!!tl) height = '100px';

   const style = {width, height};
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
    border-style: solid;
    background-color: ${props => theme.themes[props.globalTheme].element};
    border-color: ${props => theme.themes[props.globalTheme].colorA};
    border-width: 2px;
    color: ${props => theme.themes[props.globalTheme].colorA};
    resize: ${({resize}) => resize ? 'vertical' : 'none'};
    width: ${({width}) => width};
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
