import {useState} from "react";
import Employee from "./model/employee";
import CardTitle from "./component/card-title";

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
        <div className="container-lg">
            <div className="card">
                <CardTitle title="HR Panel"></CardTitle>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="identity">Identity:</label>
                        <input id="identity"
                               name="identity"
                               className="form-control"
                               type="text"
                               value={employee.identityNo}></input>
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
                        <img id="photo" src={employee.photo}></img>
                        <label className="form-label" className="btn btn-success btn-lg">
                            <input type="file" style={{display: "none"}}  type="button"></input>
                            Load
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HrApp;
