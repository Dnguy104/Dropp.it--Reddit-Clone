import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../../utils/theme.js';
import { Element } from '../../SharedComponents';
import styled from 'styled-components';

const TrendingElement = (props) => {
  const {
    className,
    globalTheme,
    trending,
   } = props;

  const renderTrending = useCallback(() => {
    return (trending.map((thread, i) => (
      <div className='list-item' key={i}>
        <p>{i+1} r/{thread.title}</p>
      </div>
    )))
  }, [trending])

  return (
    <Element className={className} globalTheme={globalTheme} style={{
      padding: '0px',
      overflow: 'hidden',
    }}>
      <div className='panel'>
        <h3>Top Communities</h3>
      </div>
      <div className='content'>
        {renderTrending()}
      </div>
    </Element>
  );
}

const StyledTrendingElement = styled(TrendingElement)`
  height: 300px;

  .panel {
    background-color: #007ce8;
    box-shadow: inset 0px 0px 20px 0px rgba(200,200,200, 0.1);
    height 60px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    h3 {
      font-size:16px;
      font-weight: 500;
      padding-left: 10px;
      padding-bottom: 10px;
      color: white;
    }
  }

  .list-item {
    padding: 10px;
    border-top: 1px solid rgba(200, 200, 200, 0.3);
    color: ${props => theme.themes[props.globalTheme].colorB};
    font-size: 14px;
  }

  .content {
    margin: 10px;
    &:first-child {
      border-color: transparent;
    }
  }
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
  trending: Object.values(state.threads.threadModels).filter(val => state.threads.trendingThreads.hasOwnProperty(val.id))

});

export default connect(mapStateToProps, { })(StyledTrendingElement);
