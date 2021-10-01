import HrApp from "./HrApp";
import {connect} from "react-redux";

const mapStateToProps = function (store) {
    return {
        hr: store.hrStore
    }
}

const REST_API_BASE_URL = "http://localhost:4001/employees";

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputChange: (event) => {
            const value = event.target.value;
            const name = event.target.name;
            dispatch({type: "MODEL_CHANGED", name, value});
        },
        handleFileInput: (event) => {
            const filename = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                dispatch({type: "READ_PHOTO_FILE", photo: e.target.result});
            };
            reader.readAsDataURL(filename); // asynchronous
        },
        retrieveAll: () => {
            fetch(REST_API_BASE_URL, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then(emps => dispatch({type: "RETRIEVE_ALL", values: emps}));
        },
        copyRow: (employee) => {
            dispatch({type: "COPY_EMPLOYEE", value: employee});
        },
        findEmployee: (identityNo) => {
            fetch(`${REST_API_BASE_URL}/${identityNo}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then(emp => dispatch({type: "FIND_EMPLOYEE", value: emp}));
        },
        fireEmpById: (identityNo) => {
            fetch(`${REST_API_BASE_URL}/${identityNo}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then(emp => {
                    dispatch({type: "FIRE_EMPLOYEE_BY_IDENTITY", value: emp});
                });
        },
        hireEmployee: (employee) => {
            fetch(REST_API_BASE_URL, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            })
                .then(res => res.json())
                .then(res => dispatch({type: "HIRE_EMPLOYEE", value: res}));
        },
        updateEmployee: (employee) => {
            fetch(REST_API_BASE_URL, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(employee)
            })
                .then(res => res.json())
                .then(res => dispatch({type: "UPDATE_EMPLOYEE", value: res}));
        }

    };
}

let HrAppConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(HrApp);

export default HrAppConnector;