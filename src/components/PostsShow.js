import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link, browserHistory } from 'react-router';

class PostsShow extends Component {

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeletePost(e) {
    if (confirm("Are you sure you want to delete this post?")) {
      this.props.deletePost(this.props.params.id)
        .then(() => {browserHistory.push('/')});

    }
  }

  render() {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button className="btn btn-danger pull-right" onClick={(e) => this.onDeletePost(e)}>Delete Post</button>
        <h3>{post.title}</h3>
        <h5>Categories: {post.categories}</h5>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
