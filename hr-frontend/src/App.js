import {useState} from "react";
import Employee from "./model/employee";
import CardTitle from "./component/card-title";
import './App.css';
import EmployeeValidationModel from "./model/employee-validation";
import validateIdentityNo from "./model/identity-validation";
import validateIban from "./model/iban-validation";
import EmployeesCard from "./component/employees_card";

// Component
// 1. Stateless -> function
// 2. Stateful
//      i. class
//     ii. React Hooks -> function
/*
    class:
    this.state = {
        employee: new Employee(),
        employees: []
    }

    this.setState({. . . })
 */
function HrApp() {
    const REST_API_BASE_URL = "http://localhost:4001/employees";

    let [employee, setEmployee] = useState(new Employee());
    let [validationModel, setValidationModel] = useState(new EmployeeValidationModel());
    let [employees, setEmployees] = useState([]);

    //region validation
    function validateEmployee(emp, fieldName) {
        let newValidationModel = {...validationModel};

        switch (fieldName) {
            case "identityNo":
                newValidationModel.isIdentityNoValid = validateIdentityNo(emp[fieldName]);
                newValidationModel.identityNoValidationMessage = "";
                if (!newValidationModel.isIdentityNoValid)
                    newValidationModel.identityNoValidationMessage =
                        <span className="alert-danger">This is not a valid identity no!</span>;
                break;
            case "iban":
                newValidationModel.isIbanNoValid = validateIban(emp[fieldName]);
                newValidationModel.ibanValidationMessage = "";
                if (!newValidationModel.isIbanNoValid)
                    newValidationModel.ibanValidationMessage =
                        <span className="alert-danger">This is not a valid iban!</span>;
                break;
            default:
                console.error(`validation for ${fieldName} is not implemented yet!`);
        }
        newValidationModel.isModelValid = newValidationModel.isIdentityNoValid && newValidationModel.isIbanNoValid;
        setValidationModel(newValidationModel);
    }

    //endregion

    //region handle changes
    function handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        console.log(event.target.type);
        let emp = {...employee}; // cloning the employee
        if (name === "fulltime") {
            emp.fulltime = !emp.fulltime;
        } else {
            emp[name] = value;
        }
        validateEmployee(emp, name);
        setEmployee(emp);
    }

    function handleFileInput(event) {
        const filename = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            let emp = {...employee}; // cloning the employee
            emp.photo = e.target.result;
            setEmployee(emp);
        };
        reader.readAsDataURL(filename); // asynchronous
    }

    //endregion

    //region onClick functions
    function hireEmployee() {
        fetch(REST_API_BASE_URL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(res => alert("Employee is hired!"));
    }

    function updateEmployee() {
        fetch(REST_API_BASE_URL, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(res => alert("Employee is updated!"));
    }

    function fireEmployee() {
        fetch(`${REST_API_BASE_URL}/${employee.identityNo}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            //.then( emp => setEmployee(emp) );
            .then(setEmployee);
    }

    function fireEmployeeByIdentity(identityNo) {
        fetch(`${REST_API_BASE_URL}/${identityNo}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(emp => {
                setEmployee(emp);
                setEmployees([...employees].filter(clonedEmp => clonedEmp.identityNo !== identityNo));
            });
    }

    function copyRow(emp) {
        setEmployee(emp);
    }

    function findEmployee() {
        fetch(`${REST_API_BASE_URL}/${employee.identityNo}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(emp => setEmployee(emp));
    }

    function retrieveAll() {
        fetch(REST_API_BASE_URL, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(res => res.json())
            .then(emps => setEmployees(emps));
    }

    //endregion

    return (
        <div className="container-md">
            <p></p>
            <div className="card">
                <CardTitle title="HR Panel"></CardTitle>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="identity">Identity:</label>
                        <div className="col">
                            <input id="identity"
                                   name="identityNo"
                                   className="col-10 btn-space"
                                   type="text"
                                   onChange={handleInputChange}
                                   value={employee.identityNo}></input>
                            <button onClick={findEmployee} className="btn btn-success">Find Employee</button>
                        </div>
                        {validationModel.identityNoValidationMessage}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="fullname">Full Name:</label>
                        <input id="fullname"
                               name="fullname"
                               type="text"
                               onChange={handleInputChange}
                               className="form-control"
                               value={employee.fullname}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="iban">Iban:</label>
                        <input id="iban"
                               name="iban"
                               type="text"
                               onChange={handleInputChange}
                               className="form-control"
                               value={employee.iban}></input>
                        {validationModel.ibanValidationMessage}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="salary">Salary:</label>
                        <input id="salary"
                               name="salary"
                               type="text"
                               onChange={handleInputChange}
                               className="form-control"
                               value={employee.salary}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="birthYear">Birth Year:</label>
                        <input id="birthYear"
                               name="birthYear"
                               type="text"
                               onChange={handleInputChange}
                               className="form-control"
                               value={employee.birthYear}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="department">Department:</label>
                        <select className="form-select"
                                name="department"
                                onChange={handleInputChange}
                                value={employee.department}
                                id="department">
                            <option>IT</option>
                            <option>Sales</option>
                            <option>Finance</option>
                            <option>HR</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input type="checkbox"
                                   id="fulltime"
                                   onChange={handleInputChange}
                                   checked={employee.fulltime}
                                   className="form-check-input"
                                   name="fulltime"/>
                            <label htmlFor="fulltime" className="form-check-label">Full-time</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photo">Photo:</label>
                        <img id="photo" alt="" src={employee.photo}></img>
                        <label className="btn btn-success btn-lg">
                            <input type="file"
                                   onChange={handleFileInput}
                                   style={{display: "none"}}></input>
                            Load
                        </label>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-success btn-space"
                                disabled={!validationModel.isModelValid}
                                onClick={hireEmployee}>Hire Employee
                        </button>
                        <button className="btn btn-warning btn-space"
                                disabled={!validationModel.isModelValid}
                                onClick={updateEmployee}>Update Employee
                        </button>
                        <button className="btn btn-danger btn-space"
                                disabled={!validationModel.isIdentityNoValid}
                                onClick={fireEmployee}>Fire Employee
                        </button>
                        <button className="btn btn-info"
                                onClick={retrieveAll}>Retrieve All
                        </button>
                    </div>
                </div>
            </div>
            <p></p>
            <EmployeesCard employees={employees}
                           copyRow={copyRow}
                           fireEmpById={fireEmployeeByIdentity}></EmployeesCard>
        </div>
    );
}

export default HrApp;
