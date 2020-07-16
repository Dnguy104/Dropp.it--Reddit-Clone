import React, { useEffect, useState, useCallback, Fragment } from 'react';
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
  const { className, commentPageLinks, collapsed, commentForm, addComment, postId } = props;
  const [prevProps, setPrevProps] = useState(props);

  const commentThreadViewInit = () => {
    let collapsingDepth = 0;
    // handled removing link chains that are collapsed
    return Object.keys(commentPageLinks).reduce((obj, key)=>{
      if(!!collapsingDepth && collapsingDepth < commentPageLinks[key].depth) return obj;
      else collapsingDepth = 0;

      if(!!collapsed && collapsed.hasOwnProperty(key)) {
        collapsingDepth = commentPageLinks[key].depth;
        obj[key] = {id: key, threadHover: false, minimized: true};
        return obj;
      }

      obj[key] = {id: key, threadHover: false, minimized: false};
      return obj;
    }, {})
  };
  const [commentThreadView, setCommentThreadView] = useState(commentPageLinks ? ()=>commentThreadViewInit() : null);

  if(prevProps.commentPageLinks !== commentPageLinks
    || prevProps.collapsed !== collapsed
    || prevProps.commentForm !== commentForm) {
    // console.log('setting setCommentThreadView')
    // console.log(commentPageLinks)
    // console.log(collapsed)
    // console.log(commentForm)
    setCommentThreadView(()=>commentThreadViewInit())
    setPrevProps(props);
  }

  const updateCommentThreadView = (commentId, state) => () => {
    setCommentThreadView({...commentThreadView, [commentId]: {...commentThreadView[commentId], threadHover: state}})
  }

  let commentThreadLinks = [];
  const renderCommentList = () => {
    console.log("rendering list:");

    return Object.keys(commentThreadView).map((key) => {
      const commentPageLink = commentPageLinks[key];
      while(commentThreadLinks.length >= commentPageLink.depth) commentThreadLinks.pop();
      commentThreadLinks.push({...commentThreadView[key]});

      return (
        <Fragment key={commentPageLink.id}>
          <CommentThread
            depth={commentPageLink.depth}
            vote
            commentThreadLinks={[...commentThreadLinks]}
            updateCommentThreadView={updateCommentThreadView}
            renderComment={()=><Comment
                            id={commentPageLink.id}
                            commentThreadView={commentThreadView[key]}
                            updateCommentThreadView={updateCommentThreadView}
                            minimized={commentThreadView[key].minimized}
                          />}
          >
          </CommentThread>
          {(!!commentForm && commentForm[key]) && !commentThreadView[key].minimized ?
          (<CommentThread
            depth={commentPageLink.depth}
            commentThreadLinks={[...commentThreadLinks]}
            updateCommentThreadView={updateCommentThreadView}
            renderComment={()=>(
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
          ></CommentThread>) : null}
        </Fragment>
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
  collapsed: state.comments.collapsed[state.posts.currentPostId],
  commentForm: state.comments.commentForm[state.posts.currentPostId],
  commentPageLinks: state.comments.commentPageLinks[state.posts.currentPostId],
  postId: state.posts.currentPostId,
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { addComment }
)(StyledCommentSection);
