import React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import first from "lodash/first";
import moment from "moment";

import { createFetchPostsAction } from "../reducer";

import "./BlogPost.scss";

const blogPost = props => {
  if (!props.postsLoaded) {
    props.store.dispatch(createFetchPostsAction());
  }

  // Get the post.
  const post = first(props.posts.filter(post => post.slug === props.slug));

  const content = (post && post.content) || "";
  const title = (post && post.title) || null;
  let time = null;
  if (post && post.timestamp) {
    time = moment(post.timestamp).fromNow();
  }

  if (title && document) {
    document.title = post.title;
  }

  let postMarkup = null;
  if (content !== "") {
    postMarkup = (
      <span className="post">
        <h1>{title}</h1>
        <h6>Posted {time}</h6>
        <ReactMarkdown source={content} />
      </span>
    );
  }

  return (
    <div className="blog-post">
      <Link to="/" className="home-link">
        Home
      </Link>

      {postMarkup}
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
  postsLoaded: state.postsLoaded
});

export default connect(mapStateToProps)(blogPost);
