import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Subtitlediv = styled.div`
  p {
    color: inherit;
    font-size: ${(props) => props.size};
  }


`

const Subtitle = (props) => {
  const {
    render,
    globalTheme,
    minimized,
    className,
    xs, sm, md, lg, xl,
  } = props;
  const minimizedStyle = minimized ? 'minimized' : '';

  let size = '12px';
  if(!!xs) size = theme.fontSize.xs;
  if(!!sm) size = theme.fontSize.sm;
  if(!!md) size = theme.fontSize.md;
  if(!!lg) size = theme.fontSize.lg;
  if(!!xl) size = theme.fontSize.xl;
  return (
    <Subtitlediv globalTheme={globalTheme} size={size} className={`${minimizedStyle}`}>
      {render()}
    </Subtitlediv>
  );
}

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Subtitle);
