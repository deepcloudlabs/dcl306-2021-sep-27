import Employee from "../model/employee";
import EmployeeValidationModel from "../model/employee-validation";
import validateIdentityNo from "../model/identity-validation";
import validateIban from "../model/iban-validation";

const initialState = {
    employee: new Employee(),
    employees: [],
    validationModel: new EmployeeValidationModel()
};

function validateEmployee(emp, fieldName, validationModel) {
    switch (fieldName) {
        case "identityNo":
            validationModel.isIdentityNoValid = validateIdentityNo(emp[fieldName]);
            validationModel.identityNoValidationMessage = "";
            if (!validationModel.isIdentityNoValid)
                validationModel.identityNoValidationMessage =
                    <span className="alert-danger">This is not a valid identity no!</span>;
            break;
        case "iban":
            validationModel.isIbanNoValid = validateIban(emp[fieldName]);
            validationModel.ibanValidationMessage = "";
            if (!validationModel.isIbanNoValid)
                validationModel.ibanValidationMessage =
                    <span className="alert-danger">This is not a valid iban!</span>;
            break;
        default:
            console.error(`validation for ${fieldName} is not implemented yet!`);
    }
    validationModel.isModelValid = validationModel.isIdentityNoValid && validationModel.isIbanNoValid;
    console.log(emp)
    console.log(validationModel)
}

export default function HrAppReducer(state, action) {
    if (state === undefined) {
        return initialState;
    }

    let newState = {...state} // clone
    newState.employee = {...state.employee};
    newState.validationModel = {...state.validationModel};

    switch (action.type) {
        case "MODEL_CHANGED":
            console.log("model changed!")
            if (action.name === "fulltime") {
                newState.employee[action.name] = !newState.employee[action.name];
            } else {
                newState.employee[action.name] = action.value;
            }
            validateEmployee(newState.employee, action.name, newState.validationModel)
            break;
        case "READ_PHOTO_FILE":
            newState.employee.photo = action.photo;
            break;
        case "RETRIEVE_ALL":
            newState.employees = action.values;
            break;
        case "FIND_EMPLOYEE":
        case "COPY_EMPLOYEE":
            newState.employee = action.value;
            break;
        case "UPDATE_EMPLOYEE":
        case "HIRE_EMPLOYEE":
            alert(action.value);
            break;
        case "FIRE_EMPLOYEE_BY_IDENTITY":
            newState.employee = action.value;
            break
        default:
    }
    return newState;
}