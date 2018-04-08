import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home/Home";
import BlogPost from "./BlogPost/BlogPost";

const Routes = store => () => (
  <BrowserRouter>
    <Switch>
      <Route path="/post/:slug" component={BlogPostWrapped(store)} />
      <Route path="/" component={HomeWrapped(store)} />
    </Switch>
  </BrowserRouter>
);

const HomeWrapped = store => () => <Home store={store} />;

const BlogPostWrapped = store => ({ match }) => (
  <BlogPost store={store} slug={match.params.slug} />
);

export default Routes;
