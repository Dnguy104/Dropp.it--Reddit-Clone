import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addPost } from '../../actions/posts.js';

class PostForm extends Component {
  state = {
    author: '',
    content: '',
    title: ''
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { author, content, title  } = this.state;
    const post = { author, content, title, slug: title };
    this.props.addPost(post);

    this.setState({
      author: '',
      content: '',
      title: ''
    });
  }

  render() {
    const { author, content, title } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Post</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              onChange={this.onChange}
              value={title}
            >
            </input>
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              className="form-control"
              type="text"
              name="author"
              onChange={this.onChange}
              value={author}
            >
            </input>
          </div>
          <div className="form-group">
            <label>Content</label>
            <input
              className="form-control"
              type="text"
              name="content"
              onChange={this.onChange}
              value={content}
            >
            </input>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
