import {useState} from "react";
import Employee from "./model/employee";
import CardTitle from "./component/card-title";
import './App.css';

// Component
// 1. Stateless -> function
// 2. Stateful
//      i. class
//     ii. React Hooks -> function
function HrApp() {
    let [employee, setEmployee] = useState(new Employee());
    let [employees, setEmployees] = useState([]);
    /*
        class:
        this.state = {
            employee: new Employee(),
            employees: []
        }

        this.setState({. . . })
     */
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
                                   name="identity"
                                   className="col-10 btn-space"
                                   type="text"
                                   value={employee.identityNo}></input>
                            <button className="btn btn-success">Find Employee</button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="fullname">Full Name:</label>
                        <input id="fullname"
                               name="fullname"
                               type="text"
                               className="form-control"
                               value={employee.fullname}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="iban">Iban:</label>
                        <input id="iban"
                               name="iban"
                               type="text"
                               className="form-control"
                               value={employee.iban}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="salary">Salary:</label>
                        <input id="salary"
                               name="salary"
                               type="text"
                               className="form-control"
                               value={employee.salary}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="salary">Salary:</label>
                        <input id="salary"
                               name="salary"
                               className="form-control"
                               type="text"
                               value={employee.salary}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="birthYear">Birth Year:</label>
                        <input id="birthYear"
                               name="birthYear"
                               className="form-control"
                               type="text"
                               value={employee.birthYear}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="department">Department:</label>
                        <select className="form-select" id="department">
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
                            <input type="file" style={{display: "none"}}></input>
                            Load
                        </label>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-success btn-space">Hire Employee</button>
                        <button className="btn btn-warning btn-space">Update Employee</button>
                        <button className="btn btn-danger btn-space">Fire Employee</button>
                        <button className="btn btn-info">Retrieve All</button>
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
