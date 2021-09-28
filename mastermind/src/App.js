import logo from './logo.svg';
import './App.css';
import React from "react";
import Move from "./model/move";
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
class App extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            game: {
                secret: this.createSecret(3),
                level: 3,
                tries: 0,
                guess: 123,
                moves: [],
                counter: 60
            },
            statistics: {
                wins: 0,
                loses: 0
            }
        };
    }

    createDigit = (min,max) => {
        return Math.floor(Math.random()*(max-min+1) + min);
    }

    createSecret = (level) => {
        let digits = [this.createDigit(1,9)];
        while (digits.length<level){
            let digit = this.createDigit(0,9);
            if (!digits.includes(digit))
                digits.push(digit);
        }
        return digits.reduce((number,digit) => 10*number + digit, 0);
    }

    handleChange = (event) => {
        let game = {...this.state.game};
        game.guess = Number(event.target.value);
        this.setState({game});
    }

    play = () => {
        let game = {...this.state.game};
        let statistics = {...this.state.statistics};
        game.tries++;
        if (game.guess === game.secret){
            game.level++;
            if (game.level > 10){
                //TODO: Player wins!: routing!
                statistics.wins++;
            } else {
                game.tries = 0;
                game.moves = [];
                game.secret = this.createSecret(game.level);
                game.counter = 60;
                this.setState({game});
            }
        } else {
            if (game.tries > 10){
                //TODO: Player loses!: routing!
                statistics.loses++;
            } else {
                game.moves.push(new Move(game.guess,this.createEvaluation(game.guess,game.secret)));
                this.setState({game});
            }
        }
    }

    createEvaluation = (guess, secret) => {
        let perfectMatch = 0;
        let partialMatch = 0;
        let guessAsString = guess.toString();
        let secretAsString = secret.toString();
        for (let i = 0; i< guessAsString.length;++i){
            let g = guessAsString.charAt(i);
            for (let j = 0; j< secretAsString.length;++j){
                let s = secretAsString.charAt(j);
                if (g === s){
                    if (i===j){
                        perfectMatch++;
                    } else {
                        partialMatch++;
                    }
                }
            }
        }
        if (partialMatch === 0 && perfectMatch=== 0)
            return "No match";
        let evaluationString = "";
        if (partialMatch>0)
            evaluationString += `-${partialMatch}`;
        if (perfectMatch>0)
            evaluationString += `+${perfectMatch}`;
        return evaluationString;
    }

    render = () => {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title"><h3>Game Console</h3></div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="level">Game Level:</label>
                            <span className="badge alert-info" id="level">{this.state.game.level}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tries">Tries:</label>
                            <span className="badge alert-info" id="tries">{this.state.game.tries}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="counter">Counter:</label>
                            <span className="badge alert-info" id="counter">{this.state.game.counter}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guess">Guess:</label>
                            <input id="guess"
                                   name="guess"
                                   className="form-control"
                                   onChange={this.handleChange}
                                   type="text" value={this.state.game.guess}></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success"
                                    onClick={this.play}>Play
                            </button>
                        </div>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title"><h3>Moves</h3></div>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-hover table-responsive table-info">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Guess</th>
                                <th>Evaluation</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.game.moves.map((move,index) =>
                                    <tr>
                                       <td>{index+1}</td>
                                       <td>{move.guess}</td>
                                       <td>{move.evaluation}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                <p></p>
                <div className="card">
                    <div className="card-header">
                        <div className="card-title"><h3>Statistics</h3></div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="wins">Wins:</label>
                            <span className="badge alert-success" id="wins">{this.state.statistics.wins} of {this.state.statistics.wins + this.state.statistics.loses}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="loses">Loses:</label>
                            <span className="badge alert-danger" id="loses">{this.state.statistics.loses} of {this.state.statistics.wins + this.state.statistics.loses}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
