import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/urls";
import { USER_BASE_URL } from "../../../utils/urls";
import { Link, useNavigate } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import axios from "../../../Config/axios";
import { toast } from "react-toastify";

const JobDetails = () => {
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const job = useSelector((state) => state.jobDetails.jobInfo);
  const employer = useSelector((state) => state.employerDetails.employerInfo);
  const image2 = `${BASE_URL}/user/${
    employer.employerdetails.logo ? employer.employerdetails.logo : ""
  }`;
  const user = useSelector((state) => state.loggedUser.userInfo);
  console.log("userInfo:", user);

  useEffect(() => {
    // Check if the user has applied for the job when the component mounts
    checkApplicationStatus();
  }, []);

  // const handleApply = async () => {
  //   const userId = user._id;
  //   console.log("user:",userId)
  //   const employerId = employer._id;
  //   console.log("employer:",employerId)
  //   const jobId = job._id;
  //   console.log("job:",jobId)

  //   try {
  //     const response = await axios.post(`${USER_BASE_URL}/apply`, {
  //       userId,
  //       employerId,
  //       jobId,
  //     });

  //     if (response.status === 200) {
  //       if(!user.userdetails){
  //         toast.success("update the profile")
  //         navigate("/user/profile-complete")
  //       }else{
  //         toast.success("Job application successful!");
  //         navigate("/user/employers");
  //       }

  //     } else {
  //       toast.error("Failed to apply for the job.");
  //     }
  //   } catch (error) {
  //     toast.error("You have already applied for this job.");
  //   }
  // };

  const handleApply = async () => {
    const userId = user._id;
    console.log("user:", userId);
    const employerId = job.employerId;
    console.log("employer:", employerId);
    const jobId = job._id;
    console.log("job:", jobId);

    try {
      const response = await axios.post(`${USER_BASE_URL}/apply`, {
        userId,
        employerId,
        jobId,
      });

      if (response.status === 200) {
        if (!user.userdetails) {
          toast.success("Update your profile");
          navigate("/user/profile-complete");
        } else {
          toast.success("Job application successful!");
          navigate("/user/jobs");
        }
        setApplied(true);
      } else {
        toast.error("Failed to apply for the job.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "User has already applied for this job"
      ) {
        toast.error("You have already applied for this job.");
      } else {
        toast.error("An error occurred while applying for the job.");
      }
    }
  };

  const checkApplicationStatus = async () => {
    console.log("123");
    try {
      console.log("12345");
      const response = await axios.post(`${USER_BASE_URL}/check-application`, {
        userId: user._id,
        jobId: job._id,
      });
      console.log("Check application response:");

      if (response.status === 200) {
        setApplied(response.data.applied);
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="md:flex items-start justify-center py-4 2xl:px-2 md:px-6 px-4">
      <div className="xl:w-1/6 lg:w-2/5 w-80  md:block hidden">
        <img className="w-28" alt="logo" src={image2} />
      </div>

      <div className="xl:w-3/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1
            className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							
						"
          >
            {job.jobTitle}
          </h1>
          <Link to={`/user/employer/details/${employer._id}`}>
            <p className="text-sm mt-2 leading-none text-gray-600">
              {employer.employerdetails.companyName} ,{job.location}.
            </p>
          </Link>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Salary</p>
          <div className="flex items-center justify-center">
            <CurrencyRupeeIcon
              style={{ fontSize: "small" }}
              className="mr-0.5   text-gray-600"
            />
            <p className="text-sm leading-none text-gray-600">
              {job?.salary} a year
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Job-Type</p>
          <div className="flex items-center justify-centre">
            <WorkOutlineOutlinedIcon
              style={{ fontSize: "small" }}
              className="mr-0.5   text-gray-600"
            />
            <p className="text-sm leading-none text-gray-600 mr-3">Full-time</p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">
            Experience Required
          </p>
          <div className="flex items-center justify-centre">
            <WorkOutlineOutlinedIcon
              style={{ fontSize: "small" }}
              className="mr-0.5   text-gray-600"
            />
            <p className="text-sm leading-none text-gray-600 mr-3">
              {job?.experience} Years
            </p>
          </div>
        </div>

        {applied ? (
          <button
            className="text-blue-500 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
        text-base
        flex
        items-center
        justify-center
        leading-none
       
        bg-gray-200
        w-full
        py-4
        "
          >
            Applied
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-blue-700
						w-full
						py-4
            
						hover:bg-blue-800"
          >
            Apply
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </button>
        )}
        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
            About the job
          </p>

          <p className="text-base leading-6 mt-4 text-gray-600">
            {job?.description}
          </p>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
            Skills Required
          </p>

          <p className="text-base leading-6 mt-4 text-gray-600">
            {job?.skills}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
