import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button.js';
import { FaExpandAlt } from "react-icons/fa";
import styled from 'styled-components';

const PostFooter = (props) => {
  const { className } = props;
  return (
    <div className={className}>
      <Button icon><FaExpandAlt/></Button>
      <Button icon>Comments</Button>
    </div>
  );
};

const StyledPostFooter = styled(PostFooter)`
  button:nth-child(1) {
    position: relative;
    left: -4px;
    font-size: 12px;
  }
  padding-top: 10px

`

export default StyledPostFooter;
