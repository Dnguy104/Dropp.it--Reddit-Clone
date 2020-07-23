import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { addPost, setPostStyle } from '../../../actions/posts.js';
import PropTypes from 'prop-types';
import { Input, Element, Form, PostCards, Title, Menu } from '../../SharedComponents';
import RightDash from '../Components/RightDash.js';
import styled from 'styled-components';
import theme from '../../../utils/theme.js';

const DivMenu = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: ${props => theme.themes[props.globalTheme].colorA};
  background-color: transparent;

  div {
    height: 25px;
    color: ${({globalTheme}) => theme.themes[globalTheme].colorA};
    background-color: ${props => theme.themes[props.globalTheme].element};
    &:hover {
      color: ${props=>theme.themes[props.globalTheme].colorB};
    }
  }
`

const MainPage = props => {
  const { globalTheme, className, addPost, setPostStyle, user } = props;

  const renderthreadSelect = (onChange, value) => {
    let threads = !!user ? Object.keys(user.subs).map((id)=>{
      return (
        <option value={id} key={id}>{id}</option>
      );
    }) : null;
    return (
      <select name="thread" onChange={onChange} value={value}>
        {threads}
      </select>
    );
  }

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

  const renderForm = () => {
    return (
      <>
        <Title fontSize='xl' title='Add Post'/>
        <Form
          submitHandler={addPost}
          submit='Submit'
          lg
          initialState={{'title': '','thread': !!user ? user.subs[Object.keys(user.subs)[0]].id : '','content' : ''}}
          render={(onChange, state) => (
            <>
              {renderthreadSelect(onChange, state['thread'])}
              <Input
                type="text"
                name="title"
                placeholder="Title"
                onChange={onChange}
                value={state['title']}
              />
              <Input
                type="text"
                name="content"
                placeholder="Text"
                xs
                resize
                text
                onChange={onChange}
                value={state['content']}
              />
            </>
          )}
        />
      </>
    );
  }

  return (
    <>
      <div className='nav-spacer'></div>
      <div className={`${className}`}>
        <div className='left-dash'>
          {!!user ?
            <Element style={{
              marginBottom: '12px',
            }}>
              {renderForm()}
            </Element>
            : null
          }
          <Element style={{
            height: '25px',
            marginBottom: '12px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
            <Menu
              right
              render={cardStyles}
              display={<p>Style</p>}
            />
          </Element>
          <PostCards />
        </div>
        <div className='right-dash'>
          <Element style={{
            height: '300px'
          }}/>
        </div>
      </div>
    </>
  );
};

MainPage.propTypes = {

};

const StyledMainPage = styled(MainPage)`
  background-color: ${props => theme.themes[props.globalTheme].background};
  height: auto;
  min-height: 100%;
  /* padding-left: 50px;
  padding-right: 50px;
  padding-top: 15px; */
  overflow: auto;
  padding: 0px 30px;
  display: flex;
  flex-dirrection: row;
  justify-content: center;

  &.fixed {
    overflow: hidden;
  }
  .right-dash {
    background-color: transparent;
    flex: 0 0 300px;
    height: auto;
    width: 300px;
    margin-left: 15px;
  }
  .left-dash {
    background-color: transparent;
    flex: 0 1 600px;
    width: 600px;
  }

`
const mapStateToProps = state => ({
  globalTheme: state.global.theme,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { addPost, setPostStyle }
)(StyledMainPage);
