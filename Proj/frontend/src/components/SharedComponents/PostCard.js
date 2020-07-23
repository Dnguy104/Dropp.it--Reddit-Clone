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

const PostCard = (props) => {
  const { className, post, handlePostCardClick, setPost, id, postStyle } = props;

  const renderContent = () => {
    if (postStyle == 'classic') {
      return (
        <div className='content-container'>
          <Title title={post.title} xl/>
          <Subtitle author={post.author} thread={post.thread} created_on={post.created_on}/>
          <PostFooter/>
        </div>
      );
    }
    else if(postStyle == 'card') {
      return (
        <div className='content-container'>
          <Subtitle author={post.author} thread={post.thread} created_on={post.created_on}/>
          <Title title={post.title} xl/>
          <div className='content'>
            <p>
              {post.content}
            </p>
          </div>
          <PostFooter/>
        </div>
      );
    }
  }

  return (
    <div className={`${className} ${postStyle}`} onClick={setPost(post)} >
      <div className='left-container'>
        <Votebox/>
      </div>
      {renderContent()}
    </div>
  );
}

PostCard.propTypes = {

};

const StyledPostCard = styled(PostCard)`
  background-color: ${props => theme.themes[props.globalTheme].element};

  display: flex;
  flex-direction: row;

  .left-container {
    margin: 8px 8px;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin: 10px 12px 0px 0px;
  }
  .content {
    mask-image: linear-gradient(180deg,#000 60%,transparent);
    color: ${props => theme.themes[props.globalTheme].colorB};
    font-size: 14px;
    padding-top: 10px;
  }

  &:hover {
    filter: brightness(1.3);
  }
`;

const mapStateToProps = (state, props) => ({
  post: state.posts.posts[props.id],
  postStyle: state.posts.postStyle,
  globalTheme: state.global.theme,
});

// const mapDispatchToProps = dispatch => ({
//   setPost: (postId) => dispatch({ type: SET_POST,
//   }),
// });

export default connect(
  mapStateToProps,
  { setPost }
)(StyledPostCard);
