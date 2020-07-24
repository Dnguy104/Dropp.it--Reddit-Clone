import React, { useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme.js';

export const DivMenu = styled.div`
  border-style: none solid solid solid;
  border-width: 1px;
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  background-color: transparent;
  position: absolute;

  div {
    padding: 5px;
    border-top-style: solid;
    border-width: 0.5px;
    border-color: ${props => theme.themes[props.globalTheme].colorA};
    color: ${({globalTheme}) => theme.themes[globalTheme].colorA};
    background-color: ${props => theme.themes[props.globalTheme].element};
    &:hover {
      color: ${props=>theme.themes[props.globalTheme].colorB};
    }
  }
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

  return (
    <div className={`${className}`} style={style} ref={node}>
      <div
        className='button'
        onClick={(e)=> {
          e.stopPropagation();
          openMenu();
        }}
      >
        {display}
      </div>
      <div className={`${menuClass} menu`}>
        {render(closeMenu)}
      </div>
    </div>
  );
};

Menu.propTypes = {

};

const StyledMenu = styled(Menu)`
  .menu {

  }
  .closed {
    display: none;
  }
  .open {
    display: block;
  }
  .button {
    height: auto;
    width: fit-content;

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
  display: flex;
  flex-direction: column;
  z-index: 1;

`

const mapStateToProps = state => ({
  // commentLoaded: state.comments.commentLoaded,
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps, {  })(StyledMenu);
