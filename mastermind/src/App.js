import logo from './logo.svg';
import './App.css';
import React from "react";
// Game Level: 3 -> 549 -> secret
//                  123 -> No match
//                  456 -> -2
//                  574 -> -1+1
//                  549 -> Game Level:4 -> 3615 -> secret
//                  ... Game Level: 10 -> User wins
//                  ... at most 10 moves -> User loses!
//                  ... 60 seconds -> User loses! ->
//                  statistics: Wins: 10 Loses: 22, ...
//                  HTML5 -> Local storage -> component life cycle
// Stateles + Stateful Component, Component Life Cycle
// Redux, Routing
class App extends React.PureComponent  {
  constructor(props,context) {
    super(props,context);
    this.state = {

    };
  }

  render = () => {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
              <div className="card-title"><h3>Game Console</h3></div>
          </div>
          <div className="card-body">

          </div>
        </div>
      </div>
    );
  }
}

export default App;
