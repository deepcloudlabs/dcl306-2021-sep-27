import CardTitle from "./component/card-title";
import {Link} from "react-router-dom";

export default function UserWins(props){
    return (
        <div className="card">
            <CardTitle title="Good game!"></CardTitle>
            <div className="card-body">
                <Link to="/">Would you like to play again!</Link>
            </div>
        </div>
    );
}