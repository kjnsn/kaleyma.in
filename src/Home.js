import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.scss";

import { createFetchPostsAction } from "./reducer";

import Spinner from "./Spinner/Spinner";

class Home extends Component {
  componentDidMount() {
    if (!this.props.postsLoaded) {
      this.props.store.dispatch(createFetchPostsAction());
    }
  }

  render() {
    const posts = this.props.posts;

    return (
      <div className="home">
        <h1>Kaley Main</h1>
        <p>Developer with a passion for the web and rock solid reliability.</p>

        <h3>Blog posts</h3>

        <div className="blog-links">
          {this.props.loading ? <Spinner /> : null}

          {posts.map(post => (
            <Link key={post.slug} to={"/post/" + post.slug}>
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  loading: state.loading,
  postsLoaded: state.postsLoaded
});

export default connect(mapStateToProps)(Home);
