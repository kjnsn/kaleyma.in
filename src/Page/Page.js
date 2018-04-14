import React from "react";

import "./Page.scss";

import githubLogo from "../images/github.svg";

const Page = props => (
  <div className="page">
    <a href="https://github.com/kjnsn/kaleyma.in" target="_blank">
      <img src={githubLogo} className="github-logo" alt="github logo" />
    </a>
    <div className="content">{props.children}</div>
  </div>
);

export default Page;
