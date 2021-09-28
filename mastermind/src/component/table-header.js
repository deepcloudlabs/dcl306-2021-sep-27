export default function TableHeader(props) {
    return (
        <thead>
        <tr>{
            props.headers.split(",").map(header =>
                <th key={header}>{header}</th>
            )
        }</tr>
        </thead>
    );
}