import React, { } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title, Votebox, Button } from '../../SharedComponents';
import { handleUpvote, handleDownvote } from '../../../actions/votes.js'
import { addComment } from '../../../actions/comments.js'
import styled from 'styled-components';
import theme from '../../../utils/theme.js';
import { AiOutlineClose } from "react-icons/ai";

const Header = props => {
  const {
    post,
    close,
    globalTheme,
    className,
    handleUpvote,
    handleDownvote,
    addComment
  } = props;



  return (
    <div className={className}>
      {post ? (
        <>
          <div  className='header'>
            <Votebox
              horizontal
              voteState={post.votestate}
              score={post.score}
              handleUpvote={handleUpvote(post.id)} handleDownvote={handleDownvote(post.id)}
            />
            <div>
              <Title style={{color: 'white'}} title={post.title} lg/>

            </div>
            <Title style={{color: 'white'}} title={'...'} lg/>
          </div>
          <Button icon onClick={close}>
            <AiOutlineClose/>
            <p>CLOSE</p>
          </Button>
        </>
      ): null}
    </div>
  );
};

Header.propTypes = {
  post: PropTypes.object.isRequired,
};

const StyledHeader = styled(Header)`
  position: fixed;
  top: 50px;
  width: calc(100% - 177px);
  margin: 0px auto;
  max-width: 1280px;

  padding:10px 15px;
  display: flex;
  flex-direction: row;
  background-color: black;
  box-sizing: border-box;
  justify-content: space-between;


  .header {
    display: flex;
  }

  ${Button} {
    font-size: 12px;
  }

  ${Votebox} {
    margin-right: 15px;
    p {
      color: white;
    }
  }
`

const mapStateToProps = (state) => ({
  post: state.posts.posts[state.posts.currentPostId],
  globalTheme: state.global.theme,
})

export default connect(
  mapStateToProps, { handleUpvote, handleDownvote, addComment }
)(StyledHeader);
