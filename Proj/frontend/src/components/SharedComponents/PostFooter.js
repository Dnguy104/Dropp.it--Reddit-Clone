import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button.js';
import Menu, { DivMenu } from './Menu.js'
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { deletePost } from '../../actions/posts.js';
import styled from 'styled-components';
import theme from '../../utils/theme.js';


const PostFooter = (props) => {
  const { globalTheme, className, user, postUser, postId, deletePost, } = props;
  const ownsPost = user && postUser == user.id;

  const moreButtons = (toggleMenu) => {
    return (
      <DivMenu globalTheme={globalTheme} className='more-menu'>
        {ownsPost ?
          <div onClick={(e)=>{e.stopPropagation(); deletePost(postId); toggleMenu();}}>
          <AiOutlineDelete />
            <p>Delete</p>
          </div>
          : null
        }
      </DivMenu>
    );
  };

  const stopProp = useCallback(e => e.stopPropagation(), [])

  return (
    <div className={className}>
      <Button icon>
        <FaCommentAlt/>
        <p>Comments</p>
      </Button>
      <Menu
        left
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

  display: flex;
  flex-direction: row;
  align-items: center;


  ${DivMenu} .more-menu{
    top: 10px;
    right: 5px;
  }

`

const mapStateToProps = (state, props) => ({
  user: state.auth.user,
  globalTheme: state.global.theme,
});

export default connect(
  mapStateToProps,
  { deletePost }
)(StyledPostFooter);
