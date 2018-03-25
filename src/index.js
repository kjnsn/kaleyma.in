import "./normalize.css";
import "./skeleton.css";
import "./index.css";

// Polyfills
import "whatwg-fetch";
import Promise from "bluebird";
if (window.Promise == undefined) {
    window.Promise = Promise;
}

import ReactDOM from "react-dom";
import React from "react";

import Home from "./Home";

ReactDOM.render(<Home></Home>, document.getElementById('root'));
