import "babel-polyfill";
import "whatwg-fetch";

import { assert } from "chai";
import { take } from "redux-saga/effects";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import sinon from "sinon";

import reducer, { createPostsSaga, createFetchPostsAction } from "./reducer";
import API from "./API";

describe("The post fetching saga", () => {
  it("Dispatches a fetch posts action", () => {
    const store = mockStore();

    store.dispatch(createFetchPostsAction());

    return new Promise((resolve, reject) => {
      store.subscribe(() => {
        // Perform assertions.
        const state = store.getState();
        assert.equal(state.posts.length, 1);

        resolve();
      });
    });
  });
});

export const mockStore = () => {
  global.fetch = sinon.mock().resolves({
    json: () => posts
  });

  const api = new API("");

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(createPostsSaga(api));

  return store;
};

const posts = [
  {
    title: "hello world",
    timestamp: "abc232",
    slug: "hello-world",
    content: ""
  }
];
