import React from "react";

import "./Home.scss";

const noop = () => {};

export default props => {
  const posts = [
    {
      slug: "how-its-built",
      title: "How I built this website"
    }
  ];
  return (
    <div className="home">
      <h1>Kaley Main</h1>
      <p>Developer with a passion for the web and rock solid reliability.</p>

      <h3>Blog posts</h3>

      <div className="blog-links">
      {posts.map(post => (
        <span key={post.slug} onClick={noop}>
          {post.title}
        </span>
      ))}
      </div>
    </div>
  );
};
