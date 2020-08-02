import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import theme from '../../../utils/theme.js';
import { Form, Title, Input, Element } from '../../SharedComponents';
import { addPost } from '../../../actions/posts.js';
import styled from 'styled-components';

const PostForm = (props) => {
  const {
    className,
    globalTheme,
    addPost,
    threadModels,
    user,
    currentThread
   } = props;

  const renderthreadSelect = (onChange, value) => {
    let threads;
    if(!!currentThread) {
      threads = (
        <option value={currentThread.id} key={currentThread.id}>
          {currentThread.title}
        </option>)
    }
    else {
      threads = !!user && !!user.subs ? Object.keys(user.subs).map((id)=>{
        return (
          <option value={user.subs[id]} key={id}>
            {threadModels[user.subs[id]].title}
          </option>
        );
      }) : null;
    }

    return (
      <select name="thread" onChange={onChange} value={value}>
        {threads}
      </select>
    );
  }

  return (
    <Element className={className} onClick={e => e.stopPropagation()}>
      <div className='form-container'>
        <Title fontSize='xl' title='Add Post'/>
        <Form
          submitHandler={addPost}
          submit='Submit'
          lg
          buttonStyle={{

          }}
          initialState={{
            'title': '',
            'thread': !!user && !!Object.keys(user.subs).length ? user.subs[Object.keys(user.subs)[0]].id : '',
            'content' : ''
          }}
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
      </div>
    </Element>
  );
}

const StyledPostForm = styled(PostForm)`
  @media only screen and (max-width: 860px) {
    width: 100%;
    .form-container {
      width: 100%;
      padding: 0px 10px;
    }
  }
  width: 800px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;

  .form-container {
    width: 500px;
  }

  h1 {
    padding-bottom: 20px;
  }
`

const mapStateToProps = (state) => ({
  globalTheme: state.global.theme,
  user: state.auth.user,
  threadModels: state.threads.threadModels,
  currentThread: state.threads.threadModels[state.threads.currentThreadId],
});

export default connect(mapStateToProps, { addPost })(StyledPostForm);
