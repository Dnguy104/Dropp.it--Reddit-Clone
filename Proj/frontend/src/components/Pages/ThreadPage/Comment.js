import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Subtitle } from '../../SharedComponents';
import theme, { colors as Colors } from '../../../utils/theme.js';
// import { setPost } from '../../actions/posts.js'

const Comment = (props) => {
  const { className, comment, key, id} = props;
  console.log("Comment: " + id);
  console.log(comment);

  return (
    comment ?
      (<div className={className} key={key} >
        <Subtitle author={comment.author} created_on={comment.created_on}/>
        <p>
          {comment.content}
        </p>
      </div>)
    : null
  );
}

Comment.propTypes = {

};

const StyledComment = styled(Comment)`
  /* border-style: solid;
  background-color: ${props => theme.themes[props.globalTheme].element};
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  border-width: 1px;
  padding: 10px;
  &:hover {
    border-color: ${Colors.white90};
  } */
  padding: 10px 15px;

`;

const mapStateToProps = (state, props) => ({
  comment: state.comments.comments[props.id],
  globalTheme: state.global.theme,
});


export default connect(
  mapStateToProps,
  {  }
)(StyledComment);
