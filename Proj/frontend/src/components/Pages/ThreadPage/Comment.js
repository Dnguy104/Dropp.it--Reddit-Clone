import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCommentReplyToggle, handleCommentCollapse } from '../../../actions/comments.js';
import styled from 'styled-components';
import { Subtitle, Button } from '../../SharedComponents';
import theme, { colors as Colors } from '../../../utils/theme.js';
import ThreadLine from './ThreadLine.js';
import { AiOutlinePlusCircle } from "react-icons/ai";

const Comment = (props) => {
  const { className,
    comment,
    minimized,
    handleCommentReplyToggle,
    handleCommentCollapse,
    updateCommentThreadView,
    commentThreadView,
    globalTheme
  } = props;

  const minimizedStyle = minimized ? 'minimized' : '';

  return (
    <div className={`${className} ${minimizedStyle}`} >
      {minimized ?
        null
        :
        <ThreadLine
          vote={true}
          key={`'t'${comment.depth}'c'${comment.id}`}
          commentId={comment.id}
          threadHover={commentThreadView.threadHover}
          updateCommentThreadView={updateCommentThreadView}
        />
      }
      <div className='content-container'>
        {minimized ?
          <Subtitle author={comment.author} created_on={comment.created_on} minimized={minimized}>
            <div className='uncollapse-button' onClick={handleCommentCollapse(comment.id)}>
              <AiOutlinePlusCircle style={{
                color: theme.themes[globalTheme].colorB,
                fontSize: '15px',
              }}/>
            </div>
          </Subtitle>
        : null}

        {minimized ? null :
          <>
            <Subtitle author={comment.author} created_on={comment.created_on} minimized={minimized}/>
            <p>
              {comment.content}
            </p>
            <p>
              {comment.depth}
            </p>
            <div>
              <Button onClick={handleCommentReplyToggle(comment.id)} icon>Reply</Button>
              <Button icon>Reply</Button>
            </div>
          </>
        }
      </div>
    </div>
  );
}

Comment.propTypes = {

};

const StyledComment = styled(Comment)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 20px;
  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
  .uncollapse-button {
    float: left;
    padding: 0px 4px;
    margin-left: 5px;
    margin-right: 6px;
  }
  .minimized:hover {
    color: ${props=>theme.themes[props.globalTheme].colorB};
  }

`;

const mapStateToProps = (state, props) => ({
  comment: state.comments.commentModels[props.commentThreadView.id],
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  { handleCommentReplyToggle, handleCommentCollapse }
)(StyledComment);
