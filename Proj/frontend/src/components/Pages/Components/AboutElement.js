import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../../utils/theme.js';
import { Element } from '../../SharedComponents';
import styled from 'styled-components';

const AboutElement = (props) => {
  const {
    className,
    globalTheme,

   } = props;



  return (
    <Element className={className} globalTheme={globalTheme} >

    </Element>
  );
}

const StyledAboutElement = styled(AboutElement)`
  height: 300px;


  }
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,

});

export default connect(mapStateToProps, { })(StyledAboutElement);
