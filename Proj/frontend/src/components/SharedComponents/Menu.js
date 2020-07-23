import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme.js';


const Menu = props => {
  const {
    className,
    children,
    render,
    display,
    left,
    style
  } = props;
  const [menuState, setMenuState] = useState(false)

  const toggleMenu = useCallback((e) => {
    console.log('toggle')
    menuState ? setMenuState(false) : setMenuState(true);
  }, [menuState])


  let menuClass = 'closed';
  if(menuState) {
    menuClass = 'open';
  }

  return (
    <div className={`${className}`} style={style}>
      <div className='button' onClick={toggleMenu}>
        <div style={{
          height: 'fit-content'
        }}>
          {display}
        </div>
      </div>
      <div className={menuClass}>
        {render(toggleMenu)}
      </div>
    </div>
  );
};

Menu.propTypes = {

};

const StyledMenu = styled(Menu)`
  .closed {
    display: none;
  }
  .open {
    display: block;
  }
  .button {
    height: auto;
    width: fit-content;
    border-style: solid;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => theme.themes[props.globalTheme].colorA};
    color: ${(props) => theme.themes[props.globalTheme].colorB};
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 2px 4px;
    align-self: ${props => props.right ? 'flex-end' : 'flex-start'};
  }
  p {
    font-size: 12px;
    height: fit-content;
  }
  width: 130px;
  display: flex;
  flex-direction: column;

`

const mapStateToProps = state => ({
  // commentLoaded: state.comments.commentLoaded,
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps, {  })(StyledMenu);
