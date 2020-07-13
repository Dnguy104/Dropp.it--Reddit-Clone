import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostHeader from './PostHeader.js';
import PostFooter from './PostFooter.js';
import Votebox from './Votebox.js';
import styled from 'styled-components';
import theme, { colors as Colors } from '../../utils/theme.js';
import { setPost } from '../../actions/posts.js'

const PostCard = (props) => {
  const { className, post, handlePostCardClick, setPost } = props;

  return (
    <div className={className} onClick={setPost(post)} >
      <Votebox/>
      <div className='content-container'>
        <PostHeader title={post.title} author={post.author} created_on={post.created_on} />
        <PostFooter/>
      </div>
    </div>
  );
}

PostCard.propTypes = {

};

const StyledPostCard = styled(PostCard)`
  border-style: solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  border-width: 1px;
  padding: 10px 10px 0px;
  display: flex;
  flex-direction: row;

  .content-container {
    margin-left: 5px;
  }
  &:hover {
    border-color: ${Colors.white90};
  }
`;

const mapStateToProps = (state, props) => ({
  post: state.posts.posts.find(x => x.id === props.id),
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
