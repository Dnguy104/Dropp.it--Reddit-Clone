import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { getComments } from '../../../actions/comments.js'
import { setThread } from '../../../actions/threads.js'
import { Element, LinkDiv } from '../../SharedComponents';
import CommentSection from './CommentSection.js';
import Post from './Post.js';
import Header from './Header.js';
import AboutElement from '../Components/AboutElement.js';
import theme from '../../../utils/theme.js';


const PostPage = props => {
  const { className, isModal, location, history, getComments, user, match, setThread, threadId } = props;
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const modal = isModal ? 'modal' : '';
  console.log(props)
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
        <Header close={(e)=>(history.goBack())}/>
        <div className='post-container'>
          <Element className='left-dash'>
            <Post/>
            <CommentSection/>
          </Element>
          <div className='right-dash'>
            <LinkDiv
              to={{
                pathname:`/r/${match.params.thread}`,
              }}
              onClick={setThread(location.threadId)}
            >
              <AboutElement threadId={threadId} link/>
            </LinkDiv>
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
    padding: 32px 0px;
    box-sizing: border-box;
    background-color: ${props => theme.themes[props.globalTheme].background};
  }
  .post-container {
    padding: 8px 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: auto;
  }
  @media only screen and (max-width: 860px) {
    .right-dash {
      display: none;
    }
    .left-dash {
      width: 100%;
      margin: 0px 16px;
    }
  }

  .right-dash {
    background-color: transparent;
    flex: 0 0 300px;
    height: auto;
    width: 300px;
    margin-left: 15px;
    margin-right: 16px;
  }
  .left-dash {
    flex: 0 2 740px;
    width: 740px;
    margin-left: 16px;
  }

`

const mapStateToProps = (state, props) => ({
  // commentLoaded: state.comments.commentLoaded,
  user: state.auth.user,
  globalTheme: state.global.theme,
  threadId: state.posts.posts[props.match.params.id].thread
});

export default compose(
  withRouter,
  connect(mapStateToProps, { getComments, setThread })
)(StyledPostPage);
