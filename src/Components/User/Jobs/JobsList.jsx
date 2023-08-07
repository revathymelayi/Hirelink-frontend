import React, { useState, useEffect } from "react";
import axios from "../../../Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { employerDetails } from "../../redux-toolkit/slices/employerSlice";
import { jobDetails } from "../../redux-toolkit/slices/jobSlice";

import { searchJob } from "../../../Services/UserApi";
import Pagination from "../Employers/Pagination";

function Index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const user = useSelector((state) => state.loggedUser.userInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8);


  useEffect(() => {
    fetchJobs(); // Fetch jobs when component mounts
  }, [currentPage, jobsPerPage]);

  const fetchJobs = async () => {
    try {
      const fetchJobsResponse = await axios.get(
        `api/user/jobs?userId=${user._id}&page=${currentPage}&limit=${jobsPerPage}`
      );
      const totalJobs = fetchJobsResponse.data.totalJobsCount;
      const totalPages = Math.ceil(totalJobs / jobsPerPage);
      setTotalPages(totalPages);
      setJobs(fetchJobsResponse.data.jobs);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };

  const showJobDetails = (job) => {
    console.log("job:",job)
    console.log("12345");
    dispatch(jobDetails(job))
    navigate(`/user/job/view`);
  };

  const [search, setSearchValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Value:", search);
    if(search===""){
      fetchJobs()
    }else{
      searchJob(search)
      .then((res) => {
        setJobs(res.showJob);
      })
      .catch((error) => {});
    }
   
  };

 

  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <div className="relative mb-4 flex w-1/2 flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search"
              aria-describedby="button-addon1"
            />

            <button
              type="submit"
              className="bg-blue-700 text-white px-6 text-lg font-semibold py-2 rounded-r-md"
            >
              Go
            </button>
            {/* <button
        type="button"
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r-md"
        onClick={handleClear}
      >
        Clear
      </button> */}
          </div>
        </div>
      </form>
      {/* Card is full width. Use in 12 col grid for best view. */}
      {/* Card code block start */}
      <div className="w-full mt-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            onClick={() => showJobDetails(job)}
            className="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer"
          >
            <div className="flex flex-col justify-start">
              <div className="flex justify-between items-center w-96">
                
                <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                  
                  <span> {job.jobTitle ? job.jobTitle : ""} </span>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex space-x-1 items-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span> {job.location ? job.location : ""} </span>
              </div>
              <div className="text-sm text-gray-500 flex space-x-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span> {job.salary ? job.salary : ""} </span>
               
              </div>
              <div>
                <div className="mt-5">
                 
                <span className="bg-gray-100 rounded-full  text-blue-700 text-sm px-2 py-1  shadow-xl"> {job.jobtype ? job.jobtype : ""}</span>
                 
                </div>
              </div>
             

              <div>
                <div className="mt-5">
                 
                  
                  <button className="mr-2 my-1 uppercase tracking-wider px-2 text-blue-600 border-blue-700 hover:bg-blue-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                    View Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Card code block end */}
    </>
  );
}
export default Index;
