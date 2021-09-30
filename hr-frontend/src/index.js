import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import HrApp from './App';
import reportWebVitals from './reportWebVitals';
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
