import React from "react";
import { useSelector } from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

const ViewJob = () => {
  const job = useSelector((state) => state.jobDetails.jobInfo);

  const user = useSelector(
    (state) => state.loggedUser.userInfo.employerdetails
  );

  return (
    <div className="md:flex items-start justify-center py-1 2xl:px-20 md:px-6 px-4">
      <div className="xl:w-1/6 lg:w-3/5 w-80 md:px-12 md:block hidden">
        {user?.logo ? (
          <img
            className="w-20"
            src={`https://thecartzilla.shop/user/${user.logo}`}
            alt="Uploaded logo"
          />
        ) : (
          <span className="text-white">No logo available</span>
        )}
      </div>

      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1
            className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
          >
            {user?.companyName}
          </h1>
          <p className="text-sm py-2 leading-none text-gray-600">
            {job?.location}
          </p>
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
            <p className="text-sm leading-none text-gray-600 mr-3">
              {job?.jobtype[0].name}
            </p>
          </div>
        </div>
        <button
          className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
        >
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
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
            />
          </svg>

          {job?.jobTitle}
        </button>
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
          <p className="text-base leading-4 mt-7 text-gray-600">
            About the Company
          </p>
          <p className="text-base leading-6 mt-4 text-gray-600">
            {user?.userBio}
          </p>

          <p className="text-base leading-4 mt-4 text-gray-600">
            Experience Required: {job?.experience} Years
          </p>
        </div>
      </div>
    </div>
  );
};
export default ViewJob;
