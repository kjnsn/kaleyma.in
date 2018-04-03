import React from "react";
import ReactMarkdown from "react-markdown";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import first from "lodash/first";

import { createFetchPostsAction } from "./reducer";

const blogPost = props => {
  if (!props.postsLoaded) {
    props.store.dispatch(createFetchPostsAction());
  }

  console.log(props)

  // Get the post.
  const post = first(props.posts.filter(post => post.slug === props.slug));
  console.log(post);

  const content = (post && post.content) || '';

  return (
    <div>
      <Link to="/">Home</Link>
      <span>
        <ReactMarkdown source={content} />
      </span>
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts,
  postsLoaded: state.postsLoaded
});

export default connect(mapStateToProps)(blogPost);
