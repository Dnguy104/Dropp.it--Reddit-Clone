import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../utils/theme.js';


const Menu = props => {
  const { className, children, user, render } = props;
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
    <div className={`${className}`}>
      <div className='button' onClick={toggleMenu}>
        <div style={{
          height: 'fit-content'
        }}>
          {user ?
            <p>{user.username}</p>
            :
            <p>Menu</p>
          }
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
    height: 40px;
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
    padding: 4px;
  }
  p {
    font-size: 12px;
    height: fit-content;
  }
  background-color: ${props => theme.themes[props.globalTheme].element};
  width: 130px;
`

const mapStateToProps = state => ({
  // commentLoaded: state.comments.commentLoaded,
  globalTheme: state.global.theme,
  user: state.auth.user
});

export default connect(mapStateToProps, {  })(StyledMenu);
