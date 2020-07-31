import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

export const DivMenu = styled.div`
  box-shadow: ${({globalTheme}) => {
    return (
      '0px 0px 3px 0px ' + theme.themes[globalTheme].colorB
    )
  }};
  background-color: transparent;
  position: absolute;

  div {
    padding: 5px;
    border-top-style: solid;
    border-width: 0.5px;
    border-color: ${props => theme.themes[props.globalTheme].colorA};
    color: ${({globalTheme}) => theme.themes[globalTheme].colorA};
    background-color: ${props => theme.themes[props.globalTheme].element};
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    &:hover {
      color: ${props=>theme.themes[props.globalTheme].colorB};
    }
  }
  p {
    padding-left: 5px;
  }
`

export const MenuCaret = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-top: 7px solid transparent;

`

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
  const node = useRef();

  const openMenu = useCallback((e) => {
    if(!menuState) {
      setMenuState(true);
      document.addEventListener("mousedown", handleClick);
    }
    else {
      setMenuState(false);
    }
  }, [menuState])

  const closeMenu = useCallback((e) => {
    setMenuState(false);
  }, [])

  useEffect(() => {
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    closeMenu();
  };

  let menuClass = 'closed';
  if(menuState) {
    menuClass = 'open';
  }
  let menuDirection = left ? 'left' : 'right';

  return (
    <div className={`${className} ${menuDirection}`} style={style} ref={node}>
      <div
        className={`button`}
        onClick={(e)=> {
          e.stopPropagation();
          openMenu();
        }}
      >
        {display}
      </div>
      <div className={`${menuClass} ${menuDirection} menu`}>
        {render(closeMenu)}
      </div>
    </div>
  );
};

Menu.propTypes = {

};

const StyledMenu = styled(Menu)`
  .left {
    ${DivMenu} {
      left: 5px;
      top: 50px;
    }
  }
  .right {
    ${DivMenu} {
      right: 5px;
      top: 50px;
    }
  }
  position: relative;
  width: auto;
  .closed {
    display: none;
  }
  .open {
    display: block;
  }
  .button {
    padding: 2px 4px;
  }

  p {
    font-size: 12px;
    height: fit-content;
  }
  display: flex;
  flex-direction: column;
  z-index: 1;

`

const mapStateToProps = state => ({
  // commentLoaded: state.comments.commentLoaded,
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps, {  })(StyledMenu);
