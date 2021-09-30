import React from 'react';
import * as ReactDOM from "react-dom";

export default class Logger extends React.Component {
    constructor(props) {
        super(props);
        //console.log('Logger::constructor')
    }
    /*
    componentWillMount() {
        console.log('Logger::componentWillMount is triggered')
    }
    componentDidMount(e) {
        console.log('Logger::componentDidMount is triggered')
        console.log('DOM node: ', ReactDOM.findDOMNode(this))
    }
    componentWillReceiveProps(newProps) {
        console.log('Logger::componentWillReceiveProps is triggered')
        console.log('new props: ', newProps)
    }
    shouldComponentUpdate(newProps, newState) {
        console.log('Logger::shouldComponentUpdate is triggered')
        console.log('new props: ', newProps)
        console.log('new state: ', newState)
        return true
    }
    componentWillUpdate(newProps, newState) {
        console.log('Logger::componentWillUpdate is triggered')
        console.log('new props: ', newProps)
        console.log('new state: ', newState)
    }
    componentDidUpdate(oldProps, oldState) {
        console.log('Logger::componentDidUpdate is triggered')
        console.log('new props: ', oldProps)
        console.log('old props: ', oldState)
    }
    componentWillUnmount() {
        console.log('Logger::componentWillUnmount')
    }
    */
    handleClick(event){
        console.log('Logger::mouse over on bubbling event')
        console.log(event.clientX);
        console.log(event.clientY);
    }
    handleClickCapture(event){
        console.log('Logger::mouse over on capture event')
        console.log(event.clientX);
        console.log(event.clientY);    }
    render() {
        //console.log('Logger::rendering... Display');
        return (
            <div className="App">
                <div onClick={this.handleClick}>{this.props.counter}</div>
                <div>{this.props.time}</div>
            </div>
        )
    }
}