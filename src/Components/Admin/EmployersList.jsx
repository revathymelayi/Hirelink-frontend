import React, { useMemo, useState, useEffect } from "react";
import Table from "./Table";
import axios from "../../Config/axios";
import { EMPLOYER_ROLE, PENDING_EMPLOYER } from "../../utils/roles";
import { Switch } from "@mui/material";

const EmployersList = () => {
  const columns = useMemo(
    () => [
      {
        // Second group - Details
        Header: " ",
        // Second group columns
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
          {
            Header: "Email",
            accessor: "email",
          },
         
          {
            Header: "Payment",
            accessor: "role",
            Cell: ({ value }) => {
              return value === PENDING_EMPLOYER ? "Pending" : "Completed";
            },
          },
          {
            Header: "Status",
            accessor: "isActive",
            Cell: ({ value, row }) => {
              const [isChecked, setIsChecked] = useState(value);
              const handleUserStatus = async (e) => {
                setIsChecked(!isChecked);

                const response = await axios.put(
                  `/api/admin/change-user-status/${row.original._id}`
                );
                alert(response.data.message);
              };
              return (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Switch
                    color="primary"
                    checked={isChecked}
                    onChange={handleUserStatus}
                  />
                </div>
              );
            },
          },
        ],
      },
    ],
    []
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios.get("/api/admin/employers");
      setData(result.data.employers);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default EmployersList;
