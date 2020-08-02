import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../../utils/theme.js';
import { setPostStyle } from '../../../actions/posts.js';
import { Element, Menu, DivMenu, MenuCaret } from '../../SharedComponents';
import styled from 'styled-components';
import { TiThMenu } from "react-icons/ti";
import { RiMenuLine } from "react-icons/ri";


const PostElement = (props) => {
  const {
    className,
    openPostModal,
    globalTheme,
    setPostStyle,
    handlePost,
   } = props;

   const cardStyles = (toggleMenu) => {
     return (
       <DivMenu globalTheme={globalTheme}>
         <div onClick={()=>{setPostStyle('card'); toggleMenu();}}>
          <TiThMenu />
           <p>Card</p>
         </div>
         <div onClick={()=>{setPostStyle('classic'); toggleMenu();}}>
          <RiMenuLine />
           <p>Classic</p>
         </div>
       </DivMenu>
     );
   };

  return (

    <Element className={className} style={{
      height: '30px',
      marginBottom: '12px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <div className='post' onClick={handlePost}>
        <p style={{margin:'auto 0px', lineHeight: 0, paddingLeft: '10px'}}>Create Post</p>
      </div>
      <Menu
        left
        render={cardStyles}
        display={
        <div className='menu-button'>
          <TiThMenu />
          <MenuCaret />
        </div>}
      />
    </Element>
  );
}

const StyledPostElement = styled(PostElement)`

  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .post {
    cursor: text;
    border-radius: 6px;
    color: ${({globalTheme})=>theme.themes[globalTheme].colorA};
    background-color: ${({globalTheme})=>theme.themes[globalTheme].element2};
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    justify-items: center;
    &:hover {
      background-color: rgba(100,100,100, 0.3);
    }
  }

  .menu-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    color: ${({globalTheme})=>theme.themes[globalTheme].colorA};
    padding: 10px;
    border-radius: 30px;
    :hover {
      color: ${({globalTheme})=>theme.themes[globalTheme].colorB};
      border-top-color: ${({globalTheme})=>theme.themes[globalTheme].colorB};
      box-shadow: inset 0 0 100px 100px rgba(100, 100, 100, 0.2);
    }
  }

  ${MenuCaret} {
    border-top-color: inherit;
    margin-left: 5px;
  }
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps, { setPostStyle })(StyledPostElement);
