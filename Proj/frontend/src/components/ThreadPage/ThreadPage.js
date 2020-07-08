import React, { } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Post from './Post.js';
import theme from '../../utils/theme.js';


const ThreadPage = props => {
  const { globalTheme, className, post, isModal, history } = props;

  const modal = isModal ? 'modal' : '';
  return (
    <div className={`${className} modal-wrapper`} onClick={(e)=>(history.goBack())}>
      <div className={modal} onClick={e => e.stopPropagation()}>
        <Post/>
      </div>
    </div>
  );
};

ThreadPage.propTypes = {

};

const StyledThreadPage = styled(ThreadPage)`
  .modal {
    width: calc(100% - 100px);
    max-width: 1280px;
    background-color: ${props => theme.themes[props.globalTheme].background};
  }
  &.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(30,30,30,0.9);
    overflow-y: scroll;
    display: flex;
    justify-content: center;

  }

`

const mapStateToProps = state => ({
  post: state.posts.posts.find(x => x.id === state.id),
  globalTheme: state.global.theme,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(StyledThreadPage);
