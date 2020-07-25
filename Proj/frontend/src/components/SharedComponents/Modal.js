import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme.js';


const Modal = props => {
  const { className, render, handleModalClose, style } = props;

  return (
    <div className={`${className}`} onClick={handleModalClose} style={style}>
      {render(handleModalClose)}
    </div>
  );
};

Modal.propTypes = {

};

const StyledModal = styled(Modal)`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background-color: rgba(30,30,30,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

`

const mapStateToProps = state => ({
  // commentLoaded: state.comments.commentLoaded,
  globalTheme: state.global.theme,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {  })
)(StyledModal);
