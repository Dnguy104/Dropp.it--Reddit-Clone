import React from 'react';
import PropTypes from 'prop-types';
import Subtitle from './Subtitle.js';

const PostHeader = (props) => {
  const { title, author, created_on } = props;

  return (
    <>
      <h3>{title}</h3>
      <Subtitle author={author} created_on={created_on}/>
    </>
  );
}

export default PostHeader;
