import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import EmployeeDetails from "./component/employee-details";
import 'bootstrap/dist/css/bootstrap.css';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import HrAppConnector from "./hr/HrAppConnector";
import HrAppReducer from "./hr/HrAppReducer";

let reducers = combineReducers({hrStore: HrAppReducer})
let store = createStore(reducers);

let routing = <Router>
    <Route path="/" exact component={HrAppConnector}></Route>
    <Route path="/details/:identityNo" component={EmployeeDetails}></Route>
</Router>;

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            {routing}
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
