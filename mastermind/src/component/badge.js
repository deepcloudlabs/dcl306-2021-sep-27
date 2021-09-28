// Stateless Component
// 1. js function
// 2. has not state
// 3. directly returns View
// 4. state is passed through parameters as props
import React from "react";

export default function Badge(props){
   return (
       <div className="form-group">
           <label htmlFor={props.id}>{props.label}:</label>
           <span className={"badge " + props.className} id={props.id}>{props.value}</span>
       </div>
   );
}