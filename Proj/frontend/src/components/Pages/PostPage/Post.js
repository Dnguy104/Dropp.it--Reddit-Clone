import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title, Subtitle, Input, Votebox, Form, PostFooter } from '../../SharedComponents';
import { handleUpvote, handleDownvote } from '../../../actions/votes.js'
import { addComment } from '../../../actions/comments.js'
import styled from 'styled-components';
import theme from '../../../utils/theme.js';

const Post = props => {
  const {
    post,
    globalTheme,
    className,
    handleUpvote,
    handleDownvote,
    addComment
  } = props;

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
    <div className={className}>
      {post ? (
        <>
          <Votebox
            className='post-vote'
            voteState={post.votestate}
            score={post.score}
            handleUpvote={handleUpvote(post.id)} handleDownvote={handleDownvote(post.id)}
          />
          <div className='content-container'>
            <Subtitle
              render={()=>(
                <p>
                  r/{post.thread} ~ Posted by u/{post.author} on {post.created_on}
                </p>
              )}
            />
            <Title className='title-space' title={post.title} xxl/>
            <div className='content'>
              <p>
                {post.content}
              </p>
              <PostFooter postUser={post.user} postId={post.id} globalTheme={globalTheme}/>
            </div>
            {renderForm()}
          </div>
        </>
      ): null}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

const StyledPost = styled(Post)`
  display: flex;
  flex-direction: row;

  ${Form} {
    margin-bottom: 20px;
    margin-right 30px;
  }

  p {
    color: ${(props) => theme.themes[props.globalTheme].colorA};
  }

  .content-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
  }

  .content {
    padding-top: 10px;
    padding-bottom: 40px;
    margin-right 25px;
    position: relative;
    font-size: 14px;
  }

  .title-space {
    padding-top: 6px;
    padding-bottom: 10px;
  }

  .post-vote {
    margin-right 10px;
  }
`

const mapStateToProps = (state) => ({
  post: state.posts.posts[state.posts.currentPostId],
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps, { handleUpvote, handleDownvote, addComment }
)(StyledPost);
