export default function FullTime(props) {
    if (props.employee.fulltime) {
        return (
            <div className="badge alert-warning">FULL-TIME</div>
        );
    } else {
        return (
            <div className="badge alert-info">PART-TIME</div>
        );
    }
}