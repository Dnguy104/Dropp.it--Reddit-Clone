import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../../actions/comments.js'
import Comment from './Comment.js'
import CommentThread from './CommentThread.js'
import { Form, Input } from '../../SharedComponents';
import styled from 'styled-components';
import theme, { colors as Colors } from '../../../utils/theme.js';

const CommentSection = (props) => {
  const { className, commentPageLinks, addComment, postId } = props;
  const [prevComments, setPrevComments] = useState(commentPageLinks);
  const [commentThreadView, setCommentThreadView] = useState(commentPageLinks ? commentPageLinks : null);
  console.log(postId)
  console.log(commentPageLinks)
  console.log(commentThreadView);

  const commentThreadViewInit = ()=>{
    console.log("calling init");
    return Object.keys(commentPageLinks).reduce((obj, key)=>{
        obj[key] = {id: key, threadHover: false};
        return obj;
      }, {})
  };

  if(prevComments !== commentPageLinks) {
    setCommentThreadView(()=>commentThreadViewInit())
    setPrevComments(commentPageLinks);
  }

  const updateCommentThreadView = (commentId, state) => () => {
    setCommentThreadView({...commentThreadView, [commentId]: {...commentThreadView[commentId], threadHover: state}})
  }

  let commentThreadLinks = [];
  const renderCommentList = () => {
    return Object.keys(commentThreadView).map((key) => {
      const commentPageLink = commentPageLinks[key];
      while(commentThreadLinks.length >= commentPageLink.depth) commentThreadLinks.pop();
      commentThreadLinks.push({id: commentThreadView[key].id, threadHover: commentThreadView[key].threadHover});

      if(commentPageLink.commentForm) {
        return ([
          <CommentThread
            depth={commentPageLink.depth}
            collapsable
            vote
            commentThreadLinks={[...commentThreadLinks]}
            updateCommentThreadView={updateCommentThreadView}
            key={commentPageLink.id}
            render={()=>(
              <Comment id={commentPageLink.id} commentThreadView={commentThreadView[key]} updateCommentThreadView={updateCommentThreadView}/>
            )}
          ></CommentThread>,
          <CommentThread
            depth={commentPageLink.depth}
            commentThreadLinks={[...commentThreadLinks]}
            updateCommentThreadView={updateCommentThreadView}
            key={commentPageLink.id}
            render={()=>(
              <Form submitHandler={addComment}
                submit='Comment'
                xl
                key={'f'+commentPageLink.id}
                parent={commentPageLink.id}
                initialState={{'content': ''}}
              >
                <Input
                  type="text"
                  name="content"
                  placeholder="What are your thought?"
                  xs
                  resize
                  text
                />
              </Form>
            )}
          ></CommentThread>
        ]);
      }
      return (
        <CommentThread
          depth={commentPageLink.depth}
          collapsable
          vote
          commentThreadLinks={[...commentThreadLinks]}
          updateCommentThreadView={updateCommentThreadView}
          key={commentPageLink.id}
          render={()=><Comment id={commentPageLink.id} commentThreadView={commentThreadView[key]} updateCommentThreadView={updateCommentThreadView}/>}
        ></CommentThread>
      );
    });
  };

  return (
    <div className={className}>
      {!!commentThreadView ? renderCommentList() : null}
    </div>
  );
}


const StyledCommentSection = styled(CommentSection)`
  p {
    color: ${(props) => theme.themes[props.globalTheme].colorB};
  }
`;

CommentSection.propTypes = {
  // commentPageLinks: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  commentPageLinks: state.comments.commentPageLinks[state.posts.currentPostId],
  postId: state.posts.currentPostId,
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { addComment }
)(StyledCommentSection);
