import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title, Subtitle, Input } from '../../SharedComponents';
import styled from 'styled-components';
import theme from '../../../utils/theme.js';

const Post = props => {
  const { post, className } = props;

  return (
    <div className={className}>
      {post ? (
        <>
          <Subtitle
            render={()=>(
              <p>
                r/{post.thread} ~ Posted by u/{post.author} on {post.created_on}
              </p>
            )}
          />
          <Title title={post.title} fontSize='xxl'/>
          <p>
            {post.content}
          </p>
        </>
      ): null}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

const StyledPost = styled(Post)`
  p {
    color: ${(props) => theme.themes[props.globalTheme].colorA};
  }
`

const mapStateToProps = (state) => ({
  post: state.posts.posts[state.posts.currentPostId],
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps, {  }
)(StyledPost);
