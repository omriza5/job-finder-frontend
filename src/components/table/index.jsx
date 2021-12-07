import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./style.css";

const Table = ({ columns, data }) => {
  const memoColumns = useMemo(() => columns, [columns]);
  const memoData = useMemo(() => data, [data]);

  const tableInstance = useTable({
    columns: memoColumns,
    data: memoData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <>
      <table {...getTableProps()} className="styled-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}> {column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
