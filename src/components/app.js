import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Card } from "antd";
import "./app.css";
import history from "./history";
import WrappedNormalLoginForm from "./login";
import WrappedRegistrationForm from "./signup";
  import ReportPage from "./Report";
import Expense from "./expense";
// import Home from "./home";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./layout";
import AddExpense from "./createExpense";
import addReport from "./AddReport";
import Profile from "./profile";
import {getToken} from "../storage/storage";
import { isSignedIn } from "../storage/storage";
import NewReport from "./reportcard";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUSer: null
    };
  }
 
  render() {
    return (
      <Router history={history}>
        <div>
         
            <div>
              <Link to={"/"} className="WrappedNormalLoginForm">
                
              </Link>
            </div>
          

          <Switch>
          <Route path= "/"exact component={WrappedNormalLoginForm} />
            <PrivateRoute path="/layout"exact component={Dashboard} />

         
          
          <PrivateRoute path="/expense"exact component={Expense} />
            
            
           
            <PrivateRoute path="/signup"exact component={WrappedRegistrationForm} />
            <Route path="/Report"exact component={ReportPage} />
            <PrivateRoute path="/createExpense" component={AddExpense}/>
            <Route path="/AddReport" component={addReport}/>
            <Route path="/reportcard" component={NewReport}/>
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
