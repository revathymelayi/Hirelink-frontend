import React, { useState } from 'react';
import { useFilters, useTable } from 'react-table';

const Table = ({ columns, data, selectedRows }) => {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter
    } = useTable(
        {
            columns,
            data
        },
        useFilters
    );

 // Create a state
 const [filterInput, setFilterInput] = useState('');

 // Update the state when input changes
 const handleFilterChange = e => {
     const value = e.target.value || undefined;
     setFilter('jobTitle', value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
     setFilterInput(value);
 };

 return (
    <div className="rounded-lg shadow overflow-x-auto">
        <div className="p-4">
            <div className="flex items-center mb-4  justify-between">
                <input
                    value={filterInput}
                    onChange={handleFilterChange}
                    placeholder="Search name"
                    className="p-2 px-2 text-sm py-2 text-black  rounded-md mr-2 "
                    style={{ width: '10%' }} // Increase width by setting the 'width' inline style
                />
            </div>
            <div className="inline-block min-w-full overflow-hidden ">
                <table {...getTableProps()} className="min-w-full divide-y w-full text-sm text-center text-gray-900 dark:text-gray-900 mt-5">
                    <thead className="text-sm uppercase  ">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor:"#0b55fb" , marginBottom: '5px', lineHeight: '6px' }}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="px-4 py-4 font-medium text-white uppercase tracking-wider  "
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} style={{ backgroundColor:"white"   }}className="border-b ">
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-10 py-2 ">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);
};

export default Table;
