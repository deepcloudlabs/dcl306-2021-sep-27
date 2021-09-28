import CardTitle from "./component/card-title";
import {Link} from "react-router-dom";

export default function UserLoses(props){
    return (
      <div className="card">
          <CardTitle title="You have lost the game!"></CardTitle>
          <div className="card-body">
              <Link to="/">Would you like to play again!</Link>
          </div>
      </div>
    );
}