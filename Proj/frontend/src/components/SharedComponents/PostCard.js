import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostHeader from './PostHeader.js';
import Subtitle from './Subtitle.js';
import Title from './Title.js';
import PostFooter from './PostFooter.js';
import Votebox from './Votebox.js';
import styled from 'styled-components';
import theme, { colors as Colors } from '../../utils/theme.js';
import { setPost } from '../../actions/posts.js'
import { handleUpvote, handleDownvote } from '../../actions/votes.js'

const PostCard = (props) => {
  const {
    className,
    post,
    thread,
    handlePostCardClick,
    setPost,
    id,
    postStyle,
    handleUpvote,
    handleDownvote
  } = props;
  const threadName = !!thread ? thread.title : null;

  const renderContent = () => {
    if (postStyle == 'classic') {
      return (
        <div className='content-container'>
          <Title title={post.title} xl/>
          <Subtitle
            render={()=>(
              <>
                r/{threadName} ~ Posted by u/{post.author} on {post.created_on}
              </>
            )}
          />
          <PostFooter postUser={post.user} postId={post.id}/>
        </div>
      );
    }
    else if(postStyle == 'card') {
      return (
        <div className='content-container'>
          <Subtitle
            render={()=>(
              <p>r/{threadName} ~ Posted by u/{post.author} on {post.created_on}</p>
            )}
          />
          <Title title={post.title} xl/>
          <div className='content'>
            <p>
              {post.content}
            </p>
          </div>
          <PostFooter postUser={post.user} postId={post.id}/>
        </div>
      );
    }
  }

  return (
    <div className={`${className} ${postStyle}`} onClick={setPost(post)} >
      <div className='left-container'>
        <Votebox
          style={{
            margin: '8px 8px',
          }}
          voteState={post.votestate}
          score={post.score}
          handleUpvote={handleUpvote(post.id)} handleDownvote={handleDownvote(post.id)}
        />
      </div>
      {renderContent()}
    </div>
  );
}

PostCard.propTypes = {

};

const StyledPostCard = styled(PostCard)`
  background-color: ${props => theme.themes[props.globalTheme].element};
  box-shadow: inset 0px 0px 20px 0px rgba(200,200,200, 0.2);

  display: flex;
  flex-direction: row;
  position: relative;
  color: ${props=>theme.themes[props.globalTheme].colorA};
  .left-container {
    background-color: ${props => theme.themes[props.globalTheme].element};
    border-radius: 6px 0px 0px 6px;
    box-shadow: inset 0 0 100px 100px rgba(20, 20, 20, 0.3);
  }
  &.classic > .left-container {
    border-radius: 0px;
  }
  .content-container {
    padding-left: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 10px 12px 0px 0px;
    padding-bottom: 35px;
  }
  .content {
    mask-image: linear-gradient(180deg,#000 20%,transparent);
    color: ${props => theme.themes[props.globalTheme].colorB};
    font-size: 14px;
    padding-top: 10px;

    max-height: 100px;
  }

  &:hover {
    box-shadow: inset 0 0 100px 100px rgba(100, 100, 100, 0.1),
                inset 0px 0px 20px 0px rgba(200,200,200, 0.2);

  }
`;

const mapStateToProps = (state, props) => ({
  post: state.posts.posts[props.id],
  postStyle: state.posts.postStyle,
  globalTheme: state.global.theme,
  thread: state.threads.threadModels[state.posts.posts[props.id].thread],
});

// const mapDispatchToProps = dispatch => ({
//   setPost: (postId) => dispatch({ type: SET_POST,
//   }),
// });

export default connect(
  mapStateToProps,
  { setPost, handleUpvote, handleDownvote }
)(StyledPostCard);
