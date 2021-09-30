import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import LotteryConnector from "./component/LotteryConnector";
import LotteryReducer from "./component/LotteryReducer";

let reducers = combineReducers({lotteryStore: LotteryReducer})
let store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <LotteryConnector />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);
