import React, { useState } from "react";
import { useFilters, usePagination, useTable } from "react-table";

const Table = ({ columns, data }) => {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    page, // page for the table based on the data passed(pagination)
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 6 },
    },
    useFilters,
    usePagination
  );
  const [filterInput, setFilterInput] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter("firstName", value);
    setFilterInput(value);
  };

  return (
    <div style={{marginLeft:'20rem',marginTop:'2rem'}} className="bg-white rounded-md shadow">
      <div className="p-4 ">
        <div className="flex items-center mb-4 mt-10 justify-between">
          <input
            value={filterInput}
            onChange={handleFilterChange}
            placeholder="Search name"
            className="p-2 py-1 border border-white-300 rounded-md mr-4"
            style={{ width: "80%" }}
          />

          <div>
            {/* <button className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Download Report</button> */}
          </div>
        </div>
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200 mt-10"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-100"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-1 py-1 font-medium text-gray-700 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-1 py-1 text-gray-700 border-t"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`${
                canPreviousPage
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-blue-800 pointer-events-none"
              } text-white px-1 py-1 rounded-md mr-2`}
            >
              Previous
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`${
                canNextPage
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-blue-800 pointer-events-none"
              } text-white px-1 py-1 rounded-md`}
            >
              Next
            </button>
          </div>
          <div>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
