import "./styles/index.scss";

// Polyfills
import "babel-polyfill";
import "whatwg-fetch";
import Promise from "bluebird";
if (window.Promise == undefined) {
  window.Promise = Promise;
}

// Constants
const PostsURL =
  "https://us-central1-personal-172101.cloudfunctions.net/listPosts";

import ReactDOM from "react-dom";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer, { createPostsSaga } from "./reducer";
import API from "./API";

// Connect up all of the sagas and API classes.
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const api = new API(PostsURL);
sagaMiddleware.run(createPostsSaga(api));

import RoutesFn from "./routes";
const Routes = RoutesFn(store);

ReactDOM.render(<Routes />, document.getElementById("root"));
