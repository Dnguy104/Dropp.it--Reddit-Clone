import React, { } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Post from './Post.js';


const ThreadPage = props => {
  const { className, post, threadPageShow } = props;

  // const active = threadPageShow ? 'active' : '';
  return (
    <>
      {threadPageShow ?
        (<div className={`${className}`}>
          <Post/>
        </div>)
        : null
      }
    </>
  );
};

ThreadPage.propTypes = {

};

const StyledThreadPage = styled(ThreadPage)`
  /* &.active {
    display: block;
  }
  display: none */
`

const mapStateToProps = state => ({
  post: state.posts.posts.find(x => x.id === state.id),
  threadPageShow: state.posts.threadPageShow,
});

export default connect(
  mapStateToProps
)(StyledThreadPage);
