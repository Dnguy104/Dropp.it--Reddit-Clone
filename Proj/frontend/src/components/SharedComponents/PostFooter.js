import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button.js';
import Menu, { DivMenu } from './Menu.js'
import { FaExpandAlt } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { deletePost } from '../../actions/posts.js';
import styled from 'styled-components';

const PostFooter = (props) => {
  const { globalTheme, className, user, postUser, postId, deletePost } = props;
  const ownsPost = user && postUser == user.id;

  const moreButtons = (toggleMenu) => {
    return (
      <DivMenu globalTheme={globalTheme}>
        {ownsPost ?
          <div onClick={()=>{deletePost(postId); toggleMenu();}}>
            Delete
          </div>
          : null
        }
      </DivMenu>
    );
  };

  const stopProp = useCallback(e => e.stopPropagation(), [])

  return (
    <div className={className}>
      <Button icon onClick={stopProp}><FaExpandAlt/></Button>
      <Button icon>Comments</Button>
      <Menu
        render={moreButtons}
        display={<Button icon><FiMoreHorizontal/></Button>}
      />
    </div>
  );
};

const StyledPostFooter = styled(PostFooter)`
  button:nth-child(1) {
    position: relative;
    left: -4px;
    font-size: 12px;
  }
  position: absolute;
  bottom: 0px;
  top: auto;

  display: flex;
  flex-direction: row;
  align-items: center;

`

const mapStateToProps = (state, props) => ({
  user: state.auth.user,
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { deletePost }
)(StyledPostFooter);
