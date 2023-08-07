import React, { useState } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/urls";
import { jobDetails } from "../../redux-toolkit/slices/jobSlice";

const JobSlider = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [transform, setTransform] = useState(0);
  const employer = useSelector((state) => state.employerDetails.employerInfo)

  const image2 = `${BASE_URL}/user/${
    employer.employerdetails.logo ? employer.employerdetails.logo : ""
  }`;

  const showJobDetails = (job) => {
    console.log("job:",job)
    console.log("12345");
    dispatch(jobDetails(job))
    navigate(`/user/job/details/${ job._id }`)
}
  const goNext = () => {
    setTransform((prevTransform) => prevTransform - 398);
  };

  const goPrev = () => {
    setTransform((prevTransform) => prevTransform + 398);
  };

  return (
    <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
      <div className="w-full relative flex items-center justify-center">
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
            {employer.jobs.map((job, index) => (
              <div className="group bg-white border  p-4 transition-all duration-300  lg:p-8">
                {/* <div className="mb-3 text-right">
                  <button className="text-gray-50 transition-all duration-300 hover:scale-110 hover:text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  </button>
                </div> */}
                <div className="flex items-center gap-x-2">
                  <img className="aspect-[2/2] w-16" src={image2} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {job.jobTitle}
                    </h3>
                    <span className="text-xs text-gray-900">
                      {employer.employerdetails.companyName}
                    </span>
                  </div>
                </div>
                <div className="my-4">
                  <h3 className="text-md font-medium text-blue-900">
                    {job.location}
                  </h3>

                  <div className="mt-2 text-sm text-gray-700">
                    <CurrencyRupeeIcon
                      style={{ fontSize: "small" }}
                      className="mr-0.5   text-gray-600"
                    />
                    {job.salary} a year
                  </div>
                </div>
                <div className="flex items-center justify-between" onClick={ () => showJobDetails(job) }>
                  <button className="relative mt-10 group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-blue-700">
                    <span className="relative text-sm text-white">
                      View Job
                    </span>
                    <div className="flex items-center -space-x-3 translate-x-3">
                      <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
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
