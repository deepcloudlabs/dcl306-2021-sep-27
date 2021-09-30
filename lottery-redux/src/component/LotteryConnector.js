import Lottery from "./Lottery";
import {connect} from "react-redux";

let mapStateToProps = function (store) {
    return {
        lottery: store.lotteryStore
    }
}

let mapDispatchToProps = function (dispatch) {
    return {
        handleChange: (event) => {
            dispatch({type: "COLUMN_CHANGED", value: Number(event.target.value)})
        },
        draw: () => {
            dispatch({type: "DRAW"})
        },
        reset: () => {
            dispatch({type: "RESET"})
        },
        removeLotteryNumbers: (index) => {
            dispatch({type:  "REMOVE_LOTTERY_NUMBERS", value: index})
        }
    };
}

let LotteryConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(Lottery);

export default LotteryConnector;