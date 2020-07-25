import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../../utils/theme.js';
import { setPostStyle } from '../../../actions/posts.js';
import { Element, Menu, DivMenu } from '../../SharedComponents';
import styled from 'styled-components';

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
           Card
         </div>
         <div onClick={()=>{setPostStyle('classic'); toggleMenu();}}>
           Classic
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
        <p style={{ margin: 'auto 0px', lineHeight: 0, paddingLeft: '10px'}}>Create Post</p>
      </div>
      <Menu
        right
        render={cardStyles}
        display={
        <div style={{
          color: theme.themes[globalTheme].colorB,
        }}>
          <p>Style</p>
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

  .post {
    cursor: text;
    border-radius: 6px;
    color: ${({globalTheme})=>theme.themes[globalTheme].colorA};
    background-color: rgba(100,100,100, 0.2);
    flex: 1 2 width;
    display: flex;
    flex-direction: column;
    width: 300px;
    justify-items: center;
    &:hover {
      background-color: rgba(100,100,100, 0.3);
    }
  }
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
});

export default connect(mapStateToProps, { setPostStyle })(StyledPostElement);
