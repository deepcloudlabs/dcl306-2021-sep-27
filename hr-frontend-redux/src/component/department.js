export default function Department(props) {
    return (
        <div className="badge alert-success">{props.employee.department.toUpperCase()}</div>
    );
}