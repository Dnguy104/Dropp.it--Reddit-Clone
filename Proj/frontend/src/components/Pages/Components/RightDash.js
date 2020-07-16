import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  } from '../../SharedComponents';

import styled from 'styled-components';
import theme from '../../../utils/theme.js';


const RightDash = props => {
  const { className } = props;

  return (
    <div className={`${className}`}>

    </div>
  );
};

RightDash.propTypes = {

};

const StyledRightDash = styled(RightDash)`
  background-color: transparent;
  flex: 0 0 300px;
  height: auto;
  width: 300px;

`
export default StyledRightDash;
