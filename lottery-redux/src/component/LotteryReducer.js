const initialState = {
    column: 3,
    numbers: []
};

function getLotteryNumbers(min, max, size) {
    let lotteryNumbers = [];
    while (lotteryNumbers.length < size) {
        let number = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!lotteryNumbers.includes(number))
            lotteryNumbers.push(number);
    }
    lotteryNumbers.sort((x, y) => x - y);
    return lotteryNumbers;
}

export default function LotteryReducer(state, action) {
    if (state === undefined) {
        return initialState;
    }
    let newState = {...state} // clone
    switch (action.type) {
        case "COLUMN_CHANGED":
            newState.column = action.value;
            break;
        case "REMOVE_LOTTERY_NUMBERS":
            let index = action.value;
            newState.numbers = [...newState.numbers].filter((lotteryNumbers, idx) => index !== idx);
            break;
        case "RESET":
            newState.numbers = [];
            break;
        case "DRAW":
            newState.numbers = [...newState.numbers];
            for (let i = 0; i < newState.column; ++i) {
                newState.numbers.push(getLotteryNumbers(1, 60, 6));
            }
            break;
        default:
    }
    return newState;
}