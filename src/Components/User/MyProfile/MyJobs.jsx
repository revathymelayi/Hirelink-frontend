import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../Config/axios';

const JobListing = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const user = useSelector((state) => state.loggedUser.userInfo);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(`api/user/appliedJobs?userId=${user._id}`);
        setAppliedJobs(response.data.appliedJobs);
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
      }
    };

    fetchAppliedJobs();
  }, [user._id]);

  return (
    <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-8">
      {appliedJobs.map((appliedJob) => (
        <div
          key={appliedJob._id}
           className="rounded  shadow w-full px-1 py-1  " 
        >
          <div>
          
            <h3 className="font-bold mt-px">{appliedJob.job.jobTitle}</h3>
            
            <span className="text-blue-700 text-sm">{appliedJob.employer.companyName}</span>
            <div className="flex items-center gap-3 mt-2">
             
              <span className="text-gray-400 text-sm flex gap-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {appliedJob.job.location}
              </span>
            </div>
          </div>
          {/* <div>
            <button className="bg-purple-900 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">
              Apply Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default JobListing;

