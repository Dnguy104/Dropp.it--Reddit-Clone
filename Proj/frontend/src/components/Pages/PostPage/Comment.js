import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleCommentReplyToggle, handleCommentCollapse } from '../../../actions/comments.js';
import styled from 'styled-components';
import { Subtitle, Button, Menu, DivMenu } from '../../SharedComponents';
import theme, { colors as Colors } from '../../../utils/theme.js';
import ThreadLine from './ThreadLine.js';
import { AiOutlinePlusCircle, AiOutlineDelete } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaCommentAlt } from "react-icons/fa";

const Comment = (props) => {
  const { className,
    comment,
    minimized,
    handleCommentReplyToggle,
    handleCommentCollapse,
    updateCommentThreadView,
    commentThreadView,
    globalTheme,
    user
  } = props;
  const ownsComment = user && comment.user == user.id;
  const minimizedStyle = minimized ? 'minimized' : '';

  const moreButtons = (toggleMenu) => {
    return (
      <DivMenu globalTheme={globalTheme} className='more-menu'>
        {ownsComment ?
          <div onClick={()=>{ toggleMenu();}}>
          <AiOutlineDelete />
            <p>Delete</p>
          </div>
          : null
        }
      </DivMenu>
    );
  };

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
          <Subtitle
            minimized={minimized}
            render={()=>(
              <div className='minimized-subtitle'>
                <div className='uncollapse-button' onClick={handleCommentCollapse(comment.id)}>
                  <AiOutlinePlusCircle style={{
                    color: theme.themes[globalTheme].highlight,
                    fontSize: '15px',
                  }}/>
                </div>
                <p style={{
                  display: 'inline'
                }}>{comment.author} {comment.score} points · {comment.created_on}</p>
              </div>
            )}
          />
          :
          <>
            <Subtitle
              minimized={minimized}
              render={()=>(
                <p>{comment.author} {comment.score} points · {comment.created_on}</p>
              )}
            />
            <div className='comment-content'>
              <p>
                {comment.content}
              </p>
            </div>
            <div className='comment-footer'>
              <Button onClick={handleCommentReplyToggle(comment.id)} icon>
                <FaCommentAlt />
                <p>Reply</p>
              </Button>
              <Menu
                left
                render={moreButtons}
                display={<Button icon><FiMoreHorizontal/></Button>}
              />
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
  color: ${props=>theme.themes[props.globalTheme].colorA};
  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
  .comment-content {
    color: ${(props) => theme.themes[props.globalTheme].colorB};
    padding: 5px 0px;
  }
  .comment-footer {
    padding-top: 5px;
    display: flex;
    flex-direction: row;
  }
  .minimized-subtitle {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  .uncollapse-button {
    height: 15px;
    padding: 0px 4px;
    margin-left: 5px;
    margin-right: 6px;
  }
  .minimized {
    transition-duration: 0.3s;
    &:hover {
        color: ${props=>theme.themes[props.globalTheme].colorB};
    }
  }

`;

const mapStateToProps = (state, props) => ({
  comment: state.comments.commentModels[props.commentThreadView.id],
  globalTheme: state.global.theme,
  user: state.auth.user,
});


export default connect(
  mapStateToProps,
  { handleCommentReplyToggle, handleCommentCollapse }
)(StyledComment);
