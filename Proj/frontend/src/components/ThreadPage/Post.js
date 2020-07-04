import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Title from '../SharedComponents/Title.js';
import Subtitle from '../SharedComponents/Subtitle.js';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

const Post = props => {
  const { post, className } = props;

  return (
    <div className={className}>
      <div className="post-container">
        {post ? (
          <>
            <Title title={post.title} fontSize='xxl'/>
            <Subtitle author={post.author} created_on={post.created_on}/>
          </>
        ): null}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

const StyledPost = styled(Post)`
  padding-right: 32px;
  padding-left: 32px;
  .post-container {
    padding-top: 8px;
    padding-left: 40px;
    width: 100%;
    background-color: ${(props)=>(theme.themes[props.globalTheme].element)}
  }
`

const mapStateToProps = (state) => ({
  post: state.posts.posts.find(x => x.id === state.posts.currentPostId),
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps)(StyledPost);
