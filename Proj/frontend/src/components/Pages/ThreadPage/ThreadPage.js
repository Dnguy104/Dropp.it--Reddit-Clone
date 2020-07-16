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


const ThreadPage = props => {
  const { className, isModal, history, getComments, addComment } = props;
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

  return (
    <div className={`${className} modal-wrapper`} onClick={(e)=>(history.goBack())}>
      <div className={modal} onClick={e => e.stopPropagation()}>
        <div className='nav-spacer'></div>
        <div className='post-container'>
          <div className='left-dash'>
            <Post/>
            <Form submitHandler={addComment} submit='Comment' initialState={{'content': ''}}>
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

ThreadPage.propTypes = {

};

const StyledThreadPage = styled(ThreadPage)`
&.modal-wrapper {
  position: fixed;
  box-sizing: border-box;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(30,30,30,0.9);
  overflow-y: scroll;

}
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
    background-color: ${props => theme.themes[props.globalTheme].element};
    padding: 10px;
    border-radius: 3px;
    flex: 0 2 740px;
    width: 740px;

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
