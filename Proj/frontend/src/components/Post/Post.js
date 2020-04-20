import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts, deletePost, addPost } from '../../actions/posts.js'

class Post extends Component {

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const posts = this.props.posts;

    return (
      <Fragment>
        <h2>Posts</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>author </th>
              <th>content </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map(post => (
                <tr key={post.id}>
                  <td>{post.author}</td>
                  <td>{post.content}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={this.props.deletePost.bind(this, post.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Fragment>
    );
  }
}

Post.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(Post);
