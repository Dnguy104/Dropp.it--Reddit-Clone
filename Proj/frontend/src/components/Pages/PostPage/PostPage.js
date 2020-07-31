import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getComments, addComment } from '../../../actions/comments.js'
import { Form, Input, Element } from '../../SharedComponents';
import CommentSection from './CommentSection.js';
import Post from './Post.js';
import theme from '../../../utils/theme.js';


const PostPage = props => {
  const { className, isModal, history, getComments, addComment, user } = props;
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const modal = isModal ? 'modal' : '';

  useEffect(() => {
    (async() => {
      if(!commentsLoaded) {
        const comments = await getComments();
        setCommentsLoaded(true);
      }
    })();
  })

  const renderForm = () => {
    return (
      <Form
        submitHandler={addComment}
        submit='Comment'
        initialState={{'content': ''}}
        render={(onChange, state) => (
          <Input
            type="text"
            name="content"
            placeholder="What are your thought?"
            xs
            resize
            text
            onChange={onChange}
            value={state['content']}
          />
        )}
      />
    );
  }

  return (
    <div className={`${className} modal-wrapper`} onClick={(e)=>(history.goBack())}>
      <div className={modal} onClick={e => e.stopPropagation()}>
        <div className='nav-spacer'></div>
        <div className='post-container'>
          <Element className='left-dash'>
            <Post/>
            {renderForm()}
            <CommentSection/>
          </Element>
          <div className='right-dash'>
            <Element style={{
              height: '300px'
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
};

PostPage.propTypes = {

};

const StyledPostPage = styled(PostPage)`
  z-index: 5;

  .modal {
    width: calc(100% - 160px);
    /* max-width: 1248px; */
    height: fit-content;
    min-height: 100%;
    margin: 0px auto;
    max-width: 1280px;
    padding: 32px 16px 0px;
    background-color: ${props => theme.themes[props.globalTheme].background};
  }
  .post-container {
    padding: 8px 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: auto;

  }
  ${Form} {
    margin-bottom: 20px;
  }
  .right-dash {
    background-color: transparent;
    flex: 0 0 300px;
    height: auto;
    width: 300px;
    margin-left: 15px;
  }
  .left-dash {
    flex: 0 2 740px;
    width: 740px;

  }

`

const mapStateToProps = state => ({
  // commentLoaded: state.comments.commentLoaded,
  user: state.auth.user,
  globalTheme: state.global.theme,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getComments, addComment })
)(StyledPostPage);
