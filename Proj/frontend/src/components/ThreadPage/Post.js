import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title, Subtitle, Form, Input } from '../SharedComponents';
import styled from 'styled-components';
import theme from '../../utils/theme.js';
import { addComment } from '../../actions/comments';

const Post = props => {
  const { post, className, addComment } = props;

  return (
    <div className={className}>
      <div className="post-container">
        {post ? (
          <>
            <Subtitle author={post.author} created_on={post.created_on}/>
            <Title title={post.title} fontSize='xxl'/>
            <p>
              {post.content}
            </p>
          </>
        ): null}
        <Form submitHandler={addComment} submit='Comment' xl>
          <Input
            type="text"
            name="content"
            placeholder="Text"
            xs
            resize
            text
          />
        </Form>
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
    padding-left: 25px;
    padding-right: 25px;
    background-color: ${(props)=>(theme.themes[props.globalTheme].element)}
  }
  p {
    color: ${(props) => theme.themes[props.globalTheme].colorB};
  }
`

const mapStateToProps = (state) => ({
  post: state.posts.posts.find(x => x.id === state.posts.currentPostId),
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps,
  { addComment }
)(StyledPost);
