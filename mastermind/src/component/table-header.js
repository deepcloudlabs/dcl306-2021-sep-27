export default function TableHeader(props) {
    return (
        <thead>
        <tr>{
            props.headers.split(",").map(header =>
                <th>{header}</th>
            )
        }</tr>
        </thead>
    );
}