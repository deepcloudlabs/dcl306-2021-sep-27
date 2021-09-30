import CardTitle from "./card-title";
import {Link} from "react-router-dom";
import FullTime from "./fulltime";
import Department from "./department";

export default function EmployeesCard(props) {
    if (props.employees === null || props.employees.length === 0) return "";
    return (
        <div className="card">
            <CardTitle title="Employees"></CardTitle>
            <div className="card-body">
                <div className="mb-3">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                        <tr>
                            <td>No</td>
                            <td>Identity No</td>
                            <td>Full Name</td>
                            <td>Iban</td>
                            <td>Salary</td>
                            <td>BirthYear</td>
                            <td>Department</td>
                            <td>Photo</td>
                            <td>Full-time/Part-time</td>
                            <td>Operations</td>
                        </tr>
                        </thead>
                        <tbody>{
                            props.employees.map((emp, idx) =>
                                <tr key={emp.identityNo}
                                    onClick={() => props.copyRow(emp)}>
                                    <td>{idx + 1}</td>
                                    <td>{emp.identityNo}</td>
                                    <td><Link to={"/details/" + emp.identityNo}>{emp.fullname}</Link></td>
                                    <td>{emp.iban}</td>
                                    <td>{emp.salary}</td>
                                    <td>{emp.birthYear}</td>
                                    <td><Department employee={emp}></Department></td>
                                    <td><img alt="" src={emp.photo}/></td>
                                    <td><FullTime employee={emp}></FullTime></td>
                                    <td>
                                        <button onClick={() => props.fireEmpById(emp.identityNo)}
                                                className="btn btn-danger">Fire Employee
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
}