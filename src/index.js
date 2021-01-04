import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import * as serviceWorker from "./serviceWorker";
import WrappedNormalLoginForm from "./components/login";
//import WrappedProfileSettings from "./components/profile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import WrappedRegistrationForm from "./components/signup";
//import SiderDemo from "./components/layout";
import App from "./components/app";
//import TabsCard from "./components/expenses";
import ExpTable from "./components/expense1";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
