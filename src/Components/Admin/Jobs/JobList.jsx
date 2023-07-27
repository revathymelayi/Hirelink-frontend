import React, { useMemo, useState, useEffect } from "react";
import Table from "../Table";
import axios from "../../../Config/axios"
import { EMPLOYER_ROLE, PENDING_EMPLOYER} from "../../../utils/roles"
import { Switch } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jobDetails } from "../../redux-toolkit/slices/jobSlice";



const JobList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
     //job view
     const viewJob = (job) => {
        dispatch(jobDetails(job))
        navigate(`/admin/job/${ job._id }`)
    }
    const columns = useMemo(
        () => [
            {
                // Second group - Details
                Header: " ",
                // Second group columns
                columns: [
                    {
                        Header: "Job Title",
                        accessor: "jobTitle",
                        Cell: ({ value, row }) => {
                            const data = row.original
                            return (
                                <div className="flex items-center gap-x-6">
                                    {/* <img className="h-40 w-40 rounded-full" src={ row.original.thumbnailImage ? `${ BASE_URL }/user/${ row.original.thumbnailImage }` : "/images/user-plceholder.png" } alt="" /> */}
                                    <h3 className="text-base leading-6 tracking-tight">{ row.original.jobTitle }</h3>
                                </div>
                            );
                        },
                    },
                    {
                        Header: "Company",
                        accessor: "employer[0].firstName",
                    },
                    {
                        Header: " Industry",
                        accessor: "category[0].name",
                    },
                    {
                        Header: "Job-Type",
                        accessor: "jobtype[0].name",
                    },
                    {
                        Header: "No . of applicants",
                        accessor: "0",
                    },
                   
                 
                ],
            },
        ],
        []
    );
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
            const result = await axios.get("/api/admin/jobs");
            console.log(result);
            setData(result.data.jobs);
        })();
    }, []);
    return (
        <div className="App">
            <Table columns={ columns } data={ data } />
        </div>
    );
}

export default JobList