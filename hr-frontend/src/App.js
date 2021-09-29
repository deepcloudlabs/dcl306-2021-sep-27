import {useState} from "react";
import Employee from "./model/employee";
import CardTitle from "./component/card-title";
import './App.css';

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
    let [employees, setEmployees] = useState([]);

    //region handle changes
    function handleInputChange(event){
        const value = event.target.value;
        const name = event.target.name;
        console.log(event.target.type);
        let emp = {...employee}; // cloning the employee
        if (name==="fulltime"){
            emp.fulltime = !emp.fulltime;
        } else {
            emp[name] = value;
        }
        setEmployee(emp);
    }

    function handleFileInput(event){
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
        fetch(REST_API_BASE_URL,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then( res => res.json())
            .then( res => alert("Employee is hired!"));
    }

    function updateEmployee() {
        fetch(REST_API_BASE_URL,{
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then( res => res.json())
            .then( res => alert("Employee is updated!"));
    }

    function fireEmployee() {}

    function findEmployee() {
        fetch(`${REST_API_BASE_URL}/${employee.identityNo}`,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then( res => res.json())
            .then( emp => setEmployee(emp) );
    }

    function retrieveAll() {
        fetch(REST_API_BASE_URL,{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then( res => res.json())
            .then( emps => setEmployees(emps));
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
                                onClick={hireEmployee}>Hire Employee</button>
                        <button className="btn btn-warning btn-space"
                                onClick={updateEmployee}>Update Employee</button>
                        <button className="btn btn-danger btn-space"
                                onClick={fireEmployee}>Fire Employee</button>
                        <button className="btn btn-info"
                                onClick={retrieveAll}>Retrieve All</button>
                    </div>
                </div>
            </div>
            <p></p>
            <div className="card">
                <CardTitle title="Employees"></CardTitle>
                <div className="card-body">
                    <div className="mb-3">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                            <tr>
                                <td>No</td>
                                <td>Identity No</td>
                                <td>Fullname</td>
                                <td>Iban</td>
                                <td>Salary</td>
                                <td>BirthYear</td>
                                <td>Department</td>
                                <td>Photo</td>
                                <td>Full time</td>
                                <td>Operations</td>
                            </tr>
                            </thead>
                            <tbody>{
                                employees.map((emp, idx) =>
                                    <tr key={emp.identityNo}>
                                        <td>{idx + 1}</td>
                                        <td>{emp.identityNo}</td>
                                        <td>{emp.fullname}</td>
                                        <td>{emp.iban}</td>
                                        <td>{emp.salary}</td>
                                        <td>{emp.birthYear}</td>
                                        <td>{emp.department}</td>
                                        <td><img alt="" src={emp.photo}/></td>
                                        <td>{emp.fulltime ? 'FULL TIME' : 'PART TIME'}</td>
                                        <td>
                                            <button className="btn btn-danger">Fire Employee</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HrApp;
