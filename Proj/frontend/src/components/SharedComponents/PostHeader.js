import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Title from '../SharedComponents/Title.js'
import Subtitle from '../SharedComponents/Subtitle.js';


const PostHeader = (props) => {
  const { title, author, created_on } = props;

  return (
    <>
      <Title title={title} lg/>
      <Subtitle author={author} created_on={created_on} sm/>
    </>
  );
}

export default PostHeader;
