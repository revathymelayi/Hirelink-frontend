
import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import axios from "../../../Config/axios";
import { Switch } from "@mui/material";
import EditJobtype from "./EditJobtype";

const JobtypeList = () => {
    const [openEditModal, setEditModalOpen] = useState(false)
    const [jobtypeDetails, setJobtypeDetails] = useState("")
    const toggleModal = (jobtype) => {
        setJobtypeDetails(jobtype);
        setEditModalOpen(true)
    }
    const columns = useMemo(
        () => [
            {
                // Second group columns
                Header: " ",
                columns: [
                    {
                        Header: "Id",
                        accessor: "id",
                    },
                    {
                        Header: "Jobtype",
                        accessor: "name",
                    },
                    {
                        Header: "Actions",
                        accessor: "status",
                        Cell: ({ value, row }) => {
                            const [isChecked, setIsChecked] = useState(
                                value
                            );
                            const handleUserStatus = async (e) => {
                                setIsChecked(!isChecked);

                                const response = await axios.put(
                                    `/api/admin/jobtype/change-status?jobtypeId=${ row.original._id }`
                                );
                                alert(response.data.message);
                            };
                            return (
                                <div style={ { display: "flex", flexDirection: "row", justifyContent: "center" } }>
                                    <Switch
                                        color="primary"
                                        checked={ isChecked }
                                        onChange={ handleUserStatus }
                                    />
                                    <button type="button" class="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 text-center mr-2 mb-2 dark:focus:ring-blue-900" onClick={ () => toggleModal(row.original) }>Edit</button>
                                </div>
                            );
                        },
                    },
                ],
            },
        ],
        []
    );

    const [data, setData] = useState([])
    const fetchJobtypes = async () => {
        let count = 1
        const result = await axios.get("/api/admin/job-types");
        const list = result.data.jobtypes.map((jobtype) => ({
            ...jobtype,
            id: count++
        }))
        setData(list)
    }

    useEffect(() => {
        fetchJobtypes()
    }, []);

    return (
        <>
            <div className="App">
                <Table
                    columns={ columns }
                    data={ data }
                />
            </div>
            {
                openEditModal && (
                    <EditJobtype setEditModalOpen={ setEditModalOpen } jobtypeName={ jobtypeDetails.name } jobtypeId={ jobtypeDetails._id } setData={ setData } jobtypeData={data} />
                )
            }
        </>
    );
};

export default JobtypeList;
