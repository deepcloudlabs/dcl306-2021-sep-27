import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import HrApp from './App';
import {BrowserRouter as Router, Route} from "react-router-dom";
import EmployeeDetails from "./component/employee-details";

let routing = <Router>
    <Route path="/" exact component={HrApp}></Route>
    <Route path="/details/:identityNo" component={EmployeeDetails}></Route>
</Router>;

ReactDOM.render(
  <React.StrictMode>
      {routing}
  </React.StrictMode>,
  document.getElementById('root')
);
