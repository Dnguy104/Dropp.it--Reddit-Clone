import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getComments, addComment } from '../../../actions/comments.js'
import { Form, Input } from '../../SharedComponents';
import CommentSection from './CommentSection.js';
import Post from './Post.js';
import theme from '../../../utils/theme.js';


const ThreadPage = props => {
  const { className, isModal, history, getComments, addComment } = props;
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const modal = isModal ? 'modal' : '';

  useEffect(() => {
    (async() => {
      if(!commentsLoaded) {
        console.log("getting comments")
        const comments = await getComments();
        setCommentsLoaded(true);
      }
    })();
  })

  return (
    <div className={`${className} modal-wrapper`} onClick={(e)=>(history.goBack())}>
      <div className={modal} onClick={e => e.stopPropagation()}>
        <div className='nav-spacer'></div>
        <div className='post-container'>
          <Post/>
          <Form submitHandler={addComment} submit='Comment' xl>
            <Input
              type="text"
              name="content"
              placeholder="What are your thought?"
              xs
              resize
              text
            />
          </Form>
          <CommentSection/>
        </div>
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
  .post-container {
    margin-right: 32px;
    margin-left: 32px;
    padding-top: 8px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: ${(props)=>(theme.themes[props.globalTheme].element)}
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
  ${Form} {
    margin-bottom: 20px;
  }

`

const mapStateToProps = state => ({
  // commentLoaded: state.comments.commentLoaded,
  globalTheme: state.global.theme,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getComments, addComment })
)(StyledThreadPage);
