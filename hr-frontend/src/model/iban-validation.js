const MAX = 999999999;
const MODULUS = 97;

function calculateModulus(code) {
    let reformattedCode = code.substring(4) + code.substring(0, 4);
    reformattedCode = reformattedCode.replace(/[A-Z]/g, function (match) {
        return match.charCodeAt(0) - 55;
    });
    let total = 0;
    for (let i = 0; i < reformattedCode.length; i++) {
        let charValue = reformattedCode.charCodeAt(i) - 48;
        if (charValue < 0 || charValue > 35) {
            return 0;
        }
        total = (Number(charValue) > 9 ? total * 100 : total * 10) + charValue;
        if (total < MAX) {
            total = (total % MODULUS);
        }
    }
    return total % MODULUS;
}

export default function validateIban(value) {
    if (value === undefined || value.length < 5) {
        return false
    }
    let modulusResult = calculateModulus(value);
    if (modulusResult !== 1) {
        return false;
    }
    return true;
}