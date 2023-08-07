import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import PaymentsIcon from '@mui/icons-material/Payments';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { getDashboardDetails } from "../../Services/AdminApi"
import { BASE_URL } from '../../utils/urls';

const AdminDashboard = () => {
  const [details, setDetails] = useState("")
  useEffect(() => {
    getDashboardDetails().then((response) => {
      setDetails(response)
    }).catch((error) => {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    })
  }, [])
  return (
   <div className="p-4 ml-80">
     <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 pt-6 gap-8">
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
        <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-blue-700 rounded text-white">
           <PersonOutlineIcon/>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
            {details.totalUsers}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Users
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-blue-700 rounded text-white">
           <FolderCopyIcon/>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
            {details.totalApplicant}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Applicatons
            </p>
          </div>
        </div>
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
         <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-blue-700 rounded text-white">
          <CorporateFareIcon/>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
              {details.totalCompanies}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Companies
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
              {details.totalJobPost}           </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Job post
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-blue-700 rounded text-white">
          <PaymentsIcon/>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
              ${details.total}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Revenue
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded shadow px-8 py-6 flex items-center">
          <div className="p-4 bg-blue-700 rounded text-white">
          <PaymentsIcon/>
          </div>
          <div className="ml-6">
            <h3 className="mb-1 leading-5 text-gray-800 dark:text-gray-100 font-bold text-2xl">
              {details.pendingEmployers}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm tracking-normal font-normal leading-5">
              Pending Transaction
            </p>
          </div>
        </div>
      </div>
   </div>
  )
}

export default AdminDashboard