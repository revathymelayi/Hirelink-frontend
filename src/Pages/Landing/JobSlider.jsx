import React, { useState, useEffect } from "react";
import axios from "../../Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { BASE_URL } from "../../utils/urls";


const JobSlider = () => {


  const [jobs, setJobs] = useState([]);

  const user = useSelector((state) => state.loggedUser.userInfo);
  console.log("asd:", user);
  useEffect(() => {
    (async () => {
      const fetchJobs = await axios.get(`api/auth/jobs`);
      setJobs(fetchJobs.data.jobs);
    })();
  }, [jobs.length]);
  const [transform, setTransform] = useState(0);

  const goNext = () => {
    const maxTransform = -398 * (jobs.length-1);
    if (transform > maxTransform) {
      setTransform((prevTransform) => prevTransform - 398);
    }
  };
  
  const goPrev = () => {
    if (transform < 0) {
      setTransform((prevTransform) => prevTransform + 398);
    }
  };

 
  
  return (
    <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
      <div className="w-full  flex items-center justify-center">
        <button
          aria-label="slide backward"
          className="absolute z-30 left-0 ml-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
          onClick={goPrev}
          id="prev"
        >
          <svg
            className="dark:text-gray-900"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7L7 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
          <div
            id="slider"
            className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
            style={{ transform: `translateX(${transform}px)` }}
          >
            {jobs.map((job) => (
              <div
              
                className="rounded-md w-full bg-white px-4 py-4 shadow-md transition transform duration-500 cursor-pointer"
              >
                <div className="flex flex-col justify-start">
                  <div className="flex justify-between items-center w-60">
                    <div className="text-lg font-semibold text-bookmark-blue flex space-x-1 items-center mb-2">
                     
                      <img
                          className="h-10 w-10 square-full"
                          src={`${BASE_URL}/user/${
                            job.employer.logo
                              ? job.employer.logo
                              : ""
                          }`}
                        />
                      <div>   
                      <h3> {job.jobTitle ? job.jobTitle : ""} </h3>
                      <span className="text-xs text-gray-500 flex space-x-1 " > {job.employer.companyName ? job.employer.companyName  : ""} </span>
                      </div>
                    </div>
                   
                  </div>
                 
                 
                  <div className="text-sm text-gray-800 flex space-x-1 items-center">
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
                  <div className="text-sm text-gray-800 flex space-x-1 items-center">
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
                      <span className="bg-gray-100 rounded-full  text-blue-700 text-sm px-2 py-1 mr-5 shadow-xl">
                        {" "}
                        {job.jobtype ? job.jobtype : ""}
                      </span>
                     
                      <span>
                      <Link to="/login">
                      <button className="ml-10 my-1 uppercase tracking-wider px-2 text-blue-600 border-blue-700 hover:bg-blue-600 hover:text-white border text-sm font-semibold rounded py-1 transition transform duration-500 cursor-pointer">
                        View Job
                      </button>
                      </Link>
                    </span>
                    
                    </div> 
                    
                  </div>

                 
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          aria-label="slide forward"
          className="absolute z-30 right-0 mr-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          onClick={goNext}
          id="next"
        >
          <svg
            className="dark:text-gray-900"
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L1 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default JobSlider;
