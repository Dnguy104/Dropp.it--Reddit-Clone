import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../utils/theme.js';
import styled from 'styled-components';

const Subtitlediv = styled.div`
  color: ${({globalTheme}) => theme.themes[globalTheme].colorA};
  font-size: ${(props) => props.size};

  .minimized {
    &:hover {
      color: inherit;
    }
  }
`

const Subtitle = (props) => {
  const {
    children,
    author,
    thread,
    created_on,
    globalTheme,
    minimized,
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
    <Subtitlediv globalTheme={globalTheme} size={size} className={minimizedStyle}>
      {children}
      r/{thread} ~ Posted by u/{author} on {created_on}
    </Subtitlediv>
  );
}

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(Subtitle);
