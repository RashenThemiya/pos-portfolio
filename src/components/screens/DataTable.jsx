export function DataTable({ headers, rows, columnClasses = [], minWidth, renderCell = value => value }) {
  return (
    <div className="tscroll" tabIndex={0}>
      <table className="t" style={minWidth ? { minWidth } : undefined}>
        <thead><tr>{headers.map((header, index) => <th key={index} className={columnClasses[index] || undefined}>{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => (
          <tr key={rowIndex}>{row.map((value, index) => <td key={index} className={columnClasses[index] || undefined}>{renderCell(value, index, rowIndex)}</td>)}</tr>
        ))}</tbody>
      </table>
    </div>
  );
}
