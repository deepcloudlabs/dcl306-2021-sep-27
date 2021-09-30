// React Component
// 1. Stateless
//    function Lottery() { . . . }
// 2. Stateful
//    *** i) javascript class -> class -- extends --> React.PureComponent
//       ii) react hooks! --> function
import React from "react";
import './Lottery.css';

// Stateful Component
class Lottery extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            numbers: [],
            column: 3
        };
    }

    draw = (event) => { // event
        let newLotteryNumbers = [...this.state.numbers];
        for (let i = 0; i < this.state.column; ++i) {
            newLotteryNumbers.push(this.getLotteryNumbers(1, 60, 6));
        }
        this.setState({ // async
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
        this.setState({ // async
            numbers: this.state.numbers.filter((lotteryNumbers, idx) => index !== idx) // functional
        })
    }

    render = () => {
        let table = "" // View
        if (this.state.numbers.length > 0) {
            table = <table className="table table-bordered table-hover table-striped">
                <thead>
                <tr>
                    <th>No</th>
                    {
                        Array.from(Array(6).keys()).map(i =>
                            <th>Column #{i + 1}</th>
                        )
                    }
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>{
                    this.state.numbers.map((lotteryNumbers, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {
                                lotteryNumbers.map(number =>
                                    <td>{number}</td>
                                )
                            }
                            <td>
                                <button onClick={() => this.removeLotteryNumbers(index)}
                                        className="btn btn-danger">Remove
                                </button>
                            </td>
                        </tr>)
                }
                </tbody>
            </table>;
        }
        // return MVC's V(iew)
        return ( // View -> Component Based + Functional Programming: Higher-function (map()) -> Model (this.state.numbers) -> View
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Lottery Application</div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label className="form-label horizontal-space" htmlFor="column">Column:</label>
                            <input id="column"
                                   name="column"
                                   className="form-control form-control-sm"
                                   onChange={this.handleChange}
                                   type="text"
                                   value={this.state.column}></input>
                            <button className="btn btn-success horizontal-space"
                                    onClick={this.draw}>Draw
                            </button>
                            <button className="btn btn-warning"
                                    onClick={this.reset}>Reset
                            </button>
                        </div>
                        <p></p>
                        {table}
                    </div>
                </div>
            </div>
        );
    }

}

export default Lottery;