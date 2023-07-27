import React from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/urls";
import { useNavigate, Link } from "react-router-dom";
import JobSlider from "./JobSlider";
function EmployerDetails() {
  const navigate = useNavigate();
  const employer = useSelector((state) => state.employerDetails.employerInfo);
  console.log("employer:", employer);
  const user = useSelector((state) => state.loggedUser.userInfo);
  const image1 = `${BASE_URL}/user/${
    employer.employerdetails.coverPhoto
      ? employer.employerdetails.coverPhoto
      : ""
  }`;
  const image2 = `${BASE_URL}/user/${
    employer.employerdetails.logo ? employer.employerdetails.logo : ""
  }`;
  return (
    <>
      <div className="flex items-center justify-center w-full py-8">
        {/* Card code block start */}
        <div className="bg-white dark:bg-gray-800 shadow rounded">
          <div className="relative">
            <img
              className="h-70 shadow rounded-t w-full object-cover object-center"
              src={image1}
              alt
            />
            <div className="inset-0 m-auto w-24 h-24 absolute bottom-0 -mb-12 xl:ml-10 rounded border-2 shadow border-white">
              <img
                className="w-full h-full overflow-hidden object-cover rounded"
                src={image2}
                alt
              />
            </div>
          </div>
          <div className="px-5 xl:px-10 pb-10">
            <div className="flex justify-center xl:justify-end w-full pt-16 xl:pt-5">
              {/* <div className="flex items-center">
                <svg
                  className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                  />
                </svg>
                <svg
                  className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                  />
                </svg>
                <svg
                  className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                  />
                </svg>
                <svg
                  className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                  />
                </svg>
                <svg
                  className="w-4 text-gray-200 icon icon-tabler icon-tabler-star"
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                  />
                </svg>
              </div> */}
            </div>
            <div className="pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between">
              <div className="xl:pr-16 w-full xl:w-2/3">
                <div className="text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center justify-between xl:justify-start">
                  <h2 className="mb-3 xl:mb-0 xl:mr-4 text-2xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">
                    {employer.employerdetails.companyName}
                  </h2>
                  {/* <div className="text-sm bg-indigo-700 dark:bg-indigo-600 text-white px-5 py-1 font-normal rounded-full">Pro</div> */}
                </div>
                <p className="text-center xl:text-left mt-2 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">
                  {employer.employerdetails.city}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Card code block end */}
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded">
        <div className="pt-3 xl:pt-5 flex flex-col xl:flex-row items-start xl:items-center justify-between">
          <div className="xl:pr-16 w-full ">
            <div className="text-center xl:text-left mb-3 xl:mb-0 flex flex-col xl:flex-row items-center ">
              <h4 className="mb-3 xl:mb-0 px-10 xl:mr-4 text-xl text-gray-800 dark:text-gray-100 font-medium tracking-normal">
                About
              </h4>
            </div>
            <p className=" px-10 xl:text-centre mt-2  xl:mb-3 text-sm tracking-normal text-gray-600 dark:text-gray-400 leading-5">
              {employer.employerdetails.userBio}
            </p>
          </div>
        </div>
      </div>

      <div className=" w-full py-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded">
          <div className="">
           <JobSlider/>
          </div>
        </div>
      </div>
    </>
  );
}
export default EmployerDetails;
