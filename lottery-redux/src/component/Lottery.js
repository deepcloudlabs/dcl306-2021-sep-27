// React Component
// 1. Stateless
//    function Lottery() { . . . }
// 2. Stateful
//    *** i) javascript class -> class -- extends --> React.PureComponent
//       ii) react hooks! --> function
import React from "react";
import './Lottery.css';

// Stateful Component
export default function Lottery(props) {
    let table = ""
    if (props.lottery.numbers.length > 0) {
        table = <table className="table table-bordered table-hover table-striped">
            <thead>
            <tr>
                <th>No</th>
                {
                    Array.from(Array(6).keys()).map(i =>
                        <th key={i}>Column #{i + 1}</th>
                    )
                }
                <th>Operations</th>
            </tr>
            </thead>
            <tbody>{
                props.lottery.numbers.map((lotteryNumbers, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        {
                            lotteryNumbers.map(number =>
                                <td key={number}>{number}</td>
                            )
                        }
                        <td>
                            <button onClick={() => props.removeLotteryNumbers(index)}
                                    className="btn btn-danger">Remove
                            </button>
                        </td>
                    </tr>)
            }
            </tbody>
        </table>;
    }
    return (
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
                               onChange={props.handleChange}
                               type="text"
                               value={props.lottery.column}/>
                        <button className="btn btn-success horizontal-space"
                                onClick={props.draw}>Draw
                        </button>
                        <button className="btn btn-warning"
                                onClick={props.reset}>Reset
                        </button>
                    </div>
                    <p/>
                    {table}
                </div>
            </div>
        </div>
    );
}