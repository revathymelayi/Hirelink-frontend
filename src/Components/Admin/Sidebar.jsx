// export default Sidebar;
import React, { useEffect } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CategoryIcon from "@mui/icons-material/Category";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
  }, [location]);

  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <Link
              to="/admin/dashboard"
              className={`relative flex flex-row items-center h-11 ${
                location.pathname === '/admin/dashboard'
                  ? 'focus:outline-none bg-blue-600 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
              }`}
              
              
            >
              <SpaceDashboardIcon
                className="mr-6 text-[#f3faf4]"
                style={{ fontSize: "large" }}
              />
              <span className=" text-l tracking-wide truncate">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/jobtypes"
              className={`relative flex flex-row items-center h-11 ${
                location.pathname === '/admin/jobtypes'
                  ? 'focus:outline-none bg-blue-600 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
              }`}
            >
              <CategoryIcon
                className="mr-6 text-[#f3faf4]"
                style={{ fontSize: "large" }}
              />
              <span className=" text-l tracking-wide truncate">Jobtypes</span>
            </Link>
          </li>
         
         
          <li>
            <Link
              to="/admin/categories"
              className={`relative flex flex-row items-center h-11 ${
                location.pathname === '/admin/categories'
                  ? 'focus:outline-none bg-blue-600 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
              }`}
            >
              <CategoryIcon
                className="mr-6 text-[#f3faf4]"
                style={{ fontSize: "large" }}
              />
              <span className=" text-l tracking-wide truncate">Categories</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/employers"
              className={`relative flex flex-row items-center h-11 ${
                location.pathname === '/admin/employers'
                  ? 'focus:outline-none bg-blue-600 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
              }`}
            >
              <BusinessIcon
                className="mr-6 text-[#f3faf4]"
                style={{ fontSize: "large" }}
              />
              <span className=" text-l tracking-wide truncate">Employers</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className={`relative flex flex-row items-center h-11 ${
                location.pathname === '/admin/users'
                  ? 'focus:outline-none bg-blue-600 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
              }`}
            >
              <PeopleIcon
                className="mr-6 text-[#f3faf4]"
                style={{ fontSize: "large" }}
              />
              <span className=" text-l tracking-wide truncate">
                Job Seekers
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/jobs"
              className={`relative flex flex-row items-center h-11 ${
                location.pathname === '/admin/jobs'
                  ? 'focus:outline-none bg-blue-600 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
              }`}
            >
              <WorkIcon
                className="mr-6 text-[#f3faf4]"
                style={{ fontSize: "large" }}
              />
              <span className=" text-l tracking-wide truncate">Job Post</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/revenue"
              className={`relative flex flex-row items-center h-11 ${
                location.pathname === '/admin/revenue'
                  ? 'focus:outline-none bg-blue-600 hover:bg-blue-600 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6'
              }`}
            >
              <ReceiptLongIcon
                className="mr-6 text-[#f3faf4]"
                style={{ fontSize: "large" }}
              />
              <span className=" text-l tracking-wide truncate">Revenue</span>
            </Link>
          </li>

          {/* Add more menu items as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
