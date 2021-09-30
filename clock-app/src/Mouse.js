import React from "react";

export default class Mouse extends React.Component {
    render() {
        return <div>
            <div
                style={{border: '1px solid red'}}
                onMouseOverCapture={((event)=>{
                    console.log('mouse over on capture event')
                    console.dir(event.target, this)}).bind(this)}
                onMouseOver={((event)=>{
                    console.log('mouse over on bubbling event')
                    console.dir(event.target, this)}).bind(this)} >
                Open DevTools and move your mouse cursor over here
            </div>
        </div>
    }
}