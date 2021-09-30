import React, {useState} from "react";
import './Lottery.css';

export default function Lottery(){
    let [numbers, setNumbers] = useState([])
    let [column, setColumn] = useState(3)

    let draw = () => {
        let new_numbers= [...numbers] // cloning the array
        for (let i=0;i<column;++i){
            let lottery_numbers = get_lottery_numbers() ;
            new_numbers.push(lottery_numbers)
        }
        setNumbers(new_numbers)
    }

    let reset = () => {
        setNumbers([])
    }

    let get_lottery_numbers = () => {
        let numbers = []
        while(numbers.length < 6){
            let number = Math.floor(Math.random()*60)+1
            if(!numbers.includes(number))
                numbers.push(number)
        }
        numbers.sort((x,y) => x-y)
        return numbers
    }

    let removeRow = async (rowIndex) => {
        let newNumbers = [...numbers].filter((nums,index) => index!==rowIndex)
        setNumbers(newNumbers);
    }

    let handleInput = async (event) => {
        setColumn(Number(event.target.value));
    }

    let numbersCard = "";
    if(numbers.length > 0) {
        numbersCard =  <div className="card">
            <div className="card-header">
                <div className="card-title"><h3>Lottery Numbers: {numbers.length}</h3></div>
            </div>
            <p />
            <div className="card-body">
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                    <tr>
                        {
                            Array.from(Array(6).keys()).map( i =>
                                <th key={i}>Column #{i+1}</th>
                            )
                        }
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>{
                        numbers.map( (nums,index) =>
                            <tr key={index}>{
                                nums.map( number =>
                                    <td key={number}>{number}</td>
                                )
                            }
                                <td>
                                    <button onClick={() => removeRow(index)}
                                            className="btn btn-danger">Remove</button>
                                </td>
                            </tr>
                        )
                    }</tbody>
                </table>
            </div>
        </div>;
    }
    return (
        <div className="container">
            <p/>
            <div className="card">
                <div className="card-header">
                    <div className="card-title"><h3>Lottery Application</h3></div>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="column">Column:</label>
                        <input type="text"
                               id="column"
                               name="column"
                               value={column}
                               onChange={handleInput}
                               className="form-control"/>
                    </div>
                    <div className="form-group">
                        <button onClick={draw}
                                className="btn btn-success horizontal-space">Draw</button>
                        <button onClick={reset}
                                className="btn btn-warning">Reset</button>
                    </div>
                </div>
            </div>
            <p/>
            {numbersCard}
        </div>
    ) ;
}