import React,{useState,useEffect} from "react";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CategoryIcon from '@mui/icons-material/Category';
import { fetchDashboardDetails } from "../../../Services/EmployerApi";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

const Dashboard=() =>{
  const [dashboardData, setDashboardData] = useState({
    totalJobPosts: 0,
    totalApplicants: 0,
  });

  const user = useSelector((state) => state.loggedUser.userInfo);
  useEffect(() => {
    fetchDashboardDetails(user._id)
        .then((response) => {
          setDashboardData(response);
        })
        .catch((error) => {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred. Please try again later");
            }
        });
}, []);
const { totalJobPosts, totalApplicants } = dashboardData;

  return (
    <>
      <div className="flex mt-6 justify-end items-center">
        <img
          className="object-cover md:hidden  w-full h-60"
          src="/images/yes.jpeg"
          alt="background"
        />
        <img
          className="hidden md:block object-cover  w-full h-56 lg:h-52"
          src="/images/yes.jpeg"
          alt="background"
        />
      </div>

      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-6 gap-8">
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
        <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-blue-700 rounded text-white">
           <PersonOutlineIcon/>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
            {totalApplicants}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Applicants
            </p>
          </div>
        </div>
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
         <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-blue-700 rounded text-white">
          <WorkOutlineIcon/>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
              {totalJobPosts}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Job post
            </p>
          </div>
        </div>
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
       
      </div>
    </>
  );
}

export default Dashboard;
