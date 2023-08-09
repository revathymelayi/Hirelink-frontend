
import React, { useState } from "react";
import EditUserAccount from "./EditUserAccount";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux/es/hooks/useSelector";

const YourComponent = () => {
  const [activeMenu, setActiveMenu] = useState("edit");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user= useSelector((state)=>state.loggedUser.userInfo)
  const company=useSelector((state)=>state.loggedUser.userInfo.employerdetails)

  const renderContent = () => {
    switch (activeMenu) {
      case "edit":
        return <EditUserAccount />;
      case "change password":
        return <ChangePassword />;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-full h-full ">
      <div className="flex flex-no-wrap ">
        <div
          style={{ minHeight: "400px" }}
          className={`w-64 absolute sm:relative bg-[#f6f6f6] shadow-md md:h-full flex-col justify-between ${
            !sidebarOpen ? "hidden sm:flex" : "flex"
          } ml-10 border px-8`}
        >
          <div className="border-spacing-1">
            <div className="h-16 w-full py-6 flex items-center">
              
              {company?.logo ? (
                <img
                   className="w-12 h-12 square-full dark:bg-gray-500" 
                  src={`https://thecartzilla.shop/user/${company.logo}`}
                  alt="Uploaded logo"
                 />
              ) : (
                <span className="text-white">No logo available</span>
              )}
              <div className="px-1">
                <h2 className="text-lg font-semibold">{user?.firstName}</h2>
                <span className="flex items-center space-x-1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline dark:text-gray-400"
                  >
                    {company?.companyName}
                  </a>
                </span>
              </div>
            </div>
            <ul className="mt-12 space">
              <li
                className={`flex w-full justify-between cursor-pointer items-center mb-6 ${
                  activeMenu === "edit" ? "bg-gradient-to-r from-sky-500 to-cyan-200" : ""
                }`}
              >
                <a
                  href="#"
                  onClick={() => setActiveMenu("edit")}
                  className="text-gray-700 font-semibold text-sm px-4 py-3"
                >
                  Edit Account
                </a>
              </li>
              <li
                className={`flex w-full justify-between cursor-pointer items-center mb-6 ${
                  activeMenu === "change password" ? "bg-gradient-to-r from-sky-500 to-cyan-200" : ""
                }`}
              >
                <a
                  href="#"
                  onClick={() => setActiveMenu("change password")}
                  className="text-gray-700 font-semibold text-sm px-4 py-3"
                >
                  Change Password
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`w-54 z-40 absolute bg-white shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out ${
            sidebarOpen
              ? "transform translate-x-0"
              : "transform -translate-x-54"
          }`}
          id="mobile-nav"
        >
          <button
            aria-label="toggle sidebar"
            id="openSideBar"
            className={`h-10 w-10 bg-white absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800 ${
              !sidebarOpen ? "block" : "hidden"
            }`}
            onClick={() => toggleSidebar()}
          ></button>
          <button
            aria-label="Close sidebar"
            id="closeSideBar"
            className={`hidden h-10 w-10 bg-white absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white ${
              sidebarOpen ? "block" : "hidden"
            }`}
            onClick={() => toggleSidebar()}
          ></button>
          <div className="px-8">
            <ul className="mt-12">
              <li
                className={`flex w-full justify-between cursor-pointer items-center mb-6 ${
                  activeMenu === "edit" ? "text-blue-700" : ""
                }`}
              >
                <a
                  href="#"
                  onClick={() => {
                    setActiveMenu("edit");
                    toggleSidebar();
                  }}
                  className="text-gray-900 font-semibold text-sm"
                >
                  Edit Account
                </a>
              </li>
              <li
                className={`flex w-full justify-between cursor-pointer items-center mb-6 ${
                  activeMenu === "change password" ? "text-blue-700" : ""
                }`}
              >
                <a
                  href="#"
                  onClick={() => {
                    setActiveMenu("change password");
                    toggleSidebar();
                  }}
                  className="text-gray-900 font-semibold text-sm"
                >
                  Change Password
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Sidebar ends */}
        {/* Remove class [h-64] when adding a card block */}
        <div className="container mx-auto  h-64 md:w-4/5 w-11/12 px-6">
          {/* Remove class [border-dashed border-2 border-gray-300] to remove dotted border */}
          <div className="w-full h-full ">
            <div>{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
