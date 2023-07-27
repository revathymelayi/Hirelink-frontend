import React, { useMemo, useState, useEffect } from "react";
import Table from "../EmployerTable";
import axios from "../../../Config/axios";
import { toast } from "react-toastify";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jobDetails } from "../../redux-toolkit/slices/jobSlice";

const ListJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser.userInfo);
  console.log(user)
  const [isOpen, setIsOpen] = useState(false);
  const [jobInfo, setJobInfo] = useState("");

  const hideModal = () => {
    setIsOpen(false);
  };
  const handleConfirm = async () => {
    try {
      const deleteJob = await axios.put(
        `api/employer/delete-job?jobId=${jobInfo._id}`
      );
      if (deleteJob.status === 200) {
        setData(data.filter((job) => job._id !== jobInfo._id));
        toast.success(deleteJob.message);
        hideModal();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  // view
  const viewJob = (job) => {
    dispatch(jobDetails(job));
    navigate(`/employer/job/${job._id}`);
  };

  //Edit
  const editjob = (job) => {
    dispatch(jobDetails(job));
    navigate(`/employer/edit/${job._id}`);
  };

  //delete Job
  const OpenDeleteModal = (job) => {
    setJobInfo(job);
    setIsOpen(!isOpen);
  };



 

  const columns = useMemo(
    () => [
      {
        // Second group columns
        Header: " ",
        columns: [
          {
            Header: "Job Title",
            accessor: "jobTitle",
            Cell: ({ value, row }) => {
              const logo = row.original.logo;
              
              return (
                <div className="flex items-center gap-x-3">
                  {/* <img
                    className="h-5 w-5"
                    src={`http://localhost:8080/user/${logo}`}
                    alt=""
                  /> */}
                  <h3 className="text-base leading-6 tracking-tight text-gray-900">
                    {value}
                  </h3>
                </div>
              );
            },
          },
          {
            Header: "Job-type",
            accessor: "jobtype[0].name",
          },
          {
            Header: "Category",
            accessor: "category[0].name",
          },
          {
            Header: "Action",
            accessor: "isActive",
            Cell: ({ value, row }) => {
              return (
                <div
                  className="space-x-10"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <CreateIcon
                    className="cursor-pointer"
                    onClick={() => editjob(row.original)}
                    fontSize="small"
                    sx={{ color: "#0000b3" }}
                  />
                  <DeleteIcon
                    onClick={() => OpenDeleteModal(row.original)}
                    className="cursor-pointer"
                    sx={{ color: "#e60013" }}
                    fontSize="small"
                  />
                  <VisibilityIcon
                    className="cursor-pointer"
                    onClick={() => viewJob(row.original)}
                    sx={{ color: "#b3b300" }}
                    fontSize="small"
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
      try {
        const response = await axios.get(
          `/api/employer/jobs?userId=${user._id}`
        );
        setData(response.data.jobs);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later");
        }
      }
    })();
  }, [user._id]);
  console.log(data);

  return (
    <>
      <div className="App h-screen w-md:full">
        <Table columns={columns} data={data} />
      </div>

      {isOpen && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50"
            onClick={hideModal}
          />
          <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full overflow-hidden"
          >
            <div className="relative bg-white rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={hideModal}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-4 py-4">
                <div className="w-full ">
                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-4 text-gray-400 w-10 h-2w-52 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 py-1">
                      Are you sure you want to delete this {jobInfo.jobTitle}?
                    </h3>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={handleConfirm}
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-10 py-5 mt-12 text-center mr-2"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      data-modal-hide="popup-modal"
                      type="button"
                      onClick={handleCancel}
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-10 py-5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 mt-12"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListJob;
