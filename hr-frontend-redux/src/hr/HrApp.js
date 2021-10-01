import CardTitle from "../component/card-title";
import './HrApp.css';
import EmployeesCard from "../component/employees_card";

export default function HrApp(props) {
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
                                   onChange={props.handleInputChange}
                                   value={props.hr.employee.identityNo}></input>
                            <button onClick={() => props.findEmployee(props.hr.employee.identityNo)} className="btn btn-success">Find Employee</button>
                        </div>
                        {props.hr.validationModel.identityNoValidationMessage}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="fullname">Full Name:</label>
                        <input id="fullname"
                               name="fullname"
                               type="text"
                               onChange={props.handleInputChange}
                               className="form-control"
                               value={props.hr.employee.fullname}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="iban">Iban:</label>
                        <input id="iban"
                               name="iban"
                               type="text"
                               onChange={props.handleInputChange}
                               className="form-control"
                               value={props.hr.employee.iban}></input>
                        {props.hr.validationModel.ibanValidationMessage}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="salary">Salary:</label>
                        <input id="salary"
                               name="salary"
                               type="text"
                               onChange={props.handleInputChange}
                               className="form-control"
                               value={props.hr.employee.salary}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="birthYear">Birth Year:</label>
                        <input id="birthYear"
                               name="birthYear"
                               type="text"
                               onChange={props.handleInputChange}
                               className="form-control"
                               value={props.hr.employee.birthYear}></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="department">Department:</label>
                        <select className="form-select"
                                name="department"
                                onChange={props.handleInputChange}
                                value={props.hr.employee.department}
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
                                   onChange={props.handleInputChange}
                                   checked={props.hr.employee.fulltime}
                                   className="form-check-input"
                                   name="fulltime"/>
                            <label htmlFor="fulltime" className="form-check-label">Full-time</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="photo">Photo:</label>
                        <img id="photo" alt="" src={props.hr.employee.photo}></img>
                        <label className="btn btn-success btn-lg">
                            <input type="file"
                                   onChange={props.handleFileInput}
                                   style={{display: "none"}}></input>
                            Load
                        </label>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-success btn-space"
                                disabled={!props.hr.validationModel.isModelValid}
                                onClick={() => props.hireEmployee(props.hr.employee)}>Hire Employee
                        </button>
                        <button className="btn btn-warning btn-space"
                                disabled={!props.hr.validationModel.isModelValid}
                                onClick={() => props.updateEmployee(props.hr.employee)}>Update Employee
                        </button>
                        <button className="btn btn-danger btn-space"
                                disabled={!props.hr.validationModel.isIdentityNoValid}
                                onClick={() => props.fireEmpById(props.hr.employee.identityNo)}>Fire Employee
                        </button>
                        <button className="btn btn-info"
                                onClick={props.retrieveAll}>Retrieve All
                        </button>
                    </div>
                </div>
            </div>
            <p></p>
            <EmployeesCard employees={props.hr.employees}
                           copyRow={props.copyRow}
                           fireEmpById={props.fireEmpById}></EmployeesCard>
        </div>
    );
}