import React from 'react';
import './App.css';
import Logger from "./Logger";
import * as ReactDOM from "react-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        // console.log('App::constructor')
        this.launchClock();
        this.state = {
            counter: 0,
            currentTime: (new Date()).toLocaleString()
        }
    }
    launchClock = ()=> {
        console.log('App::launchClock')
        setInterval(()=>{
            //console.log('App::before updating the state...')
            this.setState({
                counter: this.state.counter+1,
                currentTime: (new Date()).toLocaleString()
            },()=>{
             // console.log('App::after updating the state...')
            })
        }, 1000)
    }
    /*
    componentWillMount() {
        console.log('App::componentWillMount is triggered')
    }
    componentDidMount(e) {
        console.log('App::componentDidMount is triggered')
        console.log('DOM node: ', ReactDOM.findDOMNode(this))
    }
    componentWillReceiveProps(newProps) {
        console.log('App::componentWillReceiveProps is triggered')
        console.log('new props: ', newProps)
    }
    shouldComponentUpdate(newProps, newState) {
        console.log('App::shouldComponentUpdate is triggered')
        console.log('new props: ', newProps)
        console.log('new state: ', newState)
        return true
    }
    componentWillUpdate(newProps, newState) {
        console.log('App::componentWillUpdate is triggered')
        console.log('new props: ', newProps)
        console.log('new state: ', newState)
    }
    componentDidUpdate(oldProps, oldState) {
        console.log('App::componentDidUpdate is triggered')
        console.log('new props: ', oldProps)
        console.log('old props: ', oldState)
    }
    componentWillUnmount() {
        console.log('App::componentWillUnmount')
    }
    */
    handleClick(event){
        console.log('App::mouse over on bubbling event')
        console.log(event.clientX);
        console.log(event.clientY);
    }
    render() {
        //console.log('App::rendering... Display');
        return (
            <div>
                <Logger time={this.state.currentTime}
                        counter={this.state.counter}/>
            </div>
        )
    };
}