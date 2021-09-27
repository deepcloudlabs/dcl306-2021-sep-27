// React Component
// 1. Stateless
//    function Lottery() { . . . }
// 2. Stateful
//    *** i) javascript class -> class -- extends --> React.PureComponent
//       ii) react hooks! --> function
import React from "react";

// Stateful Component
class Lottery extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            numbers: [],
            column: 3
        };
    }

    draw = (event) => {
        let newLotteryNumbers = [...this.state.numbers];
        for (let i = 0; i < this.state.column; ++i) {
            newLotteryNumbers.push(this.getLotteryNumbers(1, 60, 6));
        }
        this.setState({
            numbers: newLotteryNumbers
        });
    }

    reset = (event) => {
        this.setState({
            numbers: []
        });
    }
    handleChange = (event) => {
        this.setState({ // async
            column: event.target.value
        }, () => {
            console.log("state has changed: " + this.state.column);
        });
        console.log("after calling setState(): " + this.state.column);
    }

    getLotteryNumbers = (min, max, size) => {
        let lotteryNumbers = [];
        while (lotteryNumbers.length < size) {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!lotteryNumbers.includes(number))
                lotteryNumbers.push(number);
        }
        lotteryNumbers.sort((x, y) => x - y);
        return lotteryNumbers;
    }

    removeLotteryNumbers = (index) => {
        this.setState({
            numbers: this.state.numbers.filter((lotteryNumbers,idx) => index !== idx)
        })
    }

    render = () => {
        // return MVC's V(iew)
        return ( // View
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Lottery Application</div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="column">Column:</label>
                            <input id="column"
                                   name="column"
                                   onChange={this.handleChange}
                                   type="text" value={this.state.column}></input>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success"
                                    onClick={this.draw}>Draw
                            </button>
                            <button className="btn btn-warning"
                                    onClick={this.reset}>Reset
                            </button>
                        </div>
                        <div className="form-group">
                            <table className="table table-bordered table-hover table-responsive table-info">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        {
                                           Array.from(Array(6).keys()).map( i =>
                                               <th>Column #{i+1}</th>
                                           )
                                        }
                                        <th>Operations</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    this.state.numbers.map( (lotteryNumbers,index) =>
                                        <tr>
                                           <td>{index+1}</td>
                                            {
                                               lotteryNumbers.map( number =>
                                                  <td>{number}</td>
                                               )
                                        }
                                        <td><button onClick={() => this.removeLotteryNumbers(index)} className="btn btn-danger">Remove</button></td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Lottery;