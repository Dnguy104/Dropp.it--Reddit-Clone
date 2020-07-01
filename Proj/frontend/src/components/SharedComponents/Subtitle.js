import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Subtitlediv = styled.div`
  color: ${({globalTheme}) => theme.themes[globalTheme].colorB};
`

const Subtitle = (props) => {
  const { author, created_on, globalTheme } = props;
  return (
    <Subtitlediv globalTheme={globalTheme}>
      r/Thread ~ Posted by <a>u/{author}</a> on {created_on}
    </Subtitlediv>
  );
}

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Subtitle);
