import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostCards from '../SharedComponents/PostCards.js';
import PostForm from '../SharedComponents/PostForm.js'
import styled from 'styled-components';
import theme from '../../utils/theme.js';


const MainPage = props => {
  const { className } = props;

  return (
    <div className={className}>
      <PostForm />
      <PostCards />
    </div>
  );
};

MainPage.propTypes = {

};

const StyledMainPage = styled(MainPage)`
  background-color: ${props => theme.themes[props.globalTheme].background};
  height: 100%;
  padding-left: 50px;
  padding-right: 50px;
`
const mapStateToProps = state => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps)(StyledMainPage);
