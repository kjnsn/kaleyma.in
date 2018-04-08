import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import { StaticRouter } from "react-router";
import { Link } from "react-router-dom";

import Home from "./Home";
import Spinner from "../Spinner/Spinner";

import reducer, {
  createFetchPostsAction,
  createPostsSetAction
} from "../reducer";

Enzyme.configure({ adapter: new Adapter() });

describe("<Home />", () => {
  it("renders the home page with a loading spinner", () => {
    const store = createStore(reducer);
    store.dispatch(createFetchPostsAction());

    const wrapper = shallow(<Home store={store} />).dive();
    expect(wrapper.contains(<Spinner />)).to.be.true;
  });

  it("renders the home page with posts", () => {
    const store = createStore(reducer);
    store.dispatch(createPostsSetAction(posts));

    const context = {};

    const wrapper = shallow(
      <StaticRouter context={context}>
        <Home store={store} />
      </StaticRouter>
    )
      .dive()
      .dive()
      .dive();
    expect(wrapper.contains(<Spinner />)).to.be.false;
    expect(wrapper.find(Link)).to.have.length(1);

    const link = wrapper.find(Link).get(0);
    expect(link.props.to).to.equal("/post/hello-world");
  });
});

const posts = [
  {
    title: "hello world",
    timestamp: "abc232",
    slug: "hello-world",
    content: ""
  }
];
