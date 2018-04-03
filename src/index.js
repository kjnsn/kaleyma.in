import "./normalize.css";
import "./skeleton.css";
import "./index.css";

// Polyfills
import "babel-polyfill";
import "whatwg-fetch";
import Promise from "bluebird";
if (window.Promise == undefined) {
    window.Promise = Promise;
}

// Constants
const PostsURL = "https://us-central1-personal-172101.cloudfunctions.net/listPosts";

import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import reducer, { createPostsSaga } from "./reducer";
import API from "./API";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const api = new API(PostsURL);

sagaMiddleware.run(createPostsSaga(api));

// Router
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./Home";
import BlogPost from "./BlogPost";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/post/:slug" component={BlogPostWrapped} />
            <Route path="/" component={HomeWrapped}/>
        </Switch>
    </BrowserRouter>
);

const HomeWrapped = () => (
    <Home store={store}></Home>
);

const BlogPostWrapped = ({ match }) => (
    <BlogPost store={store} slug={match.params.slug} />
);

ReactDOM.render(<App/>, document.getElementById('root'));

