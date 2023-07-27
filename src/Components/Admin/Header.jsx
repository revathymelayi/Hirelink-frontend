import React from 'react';
import { logoutUser } from "../redux-toolkit/slices/userSlice"
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    Cookies.remove("accessToken")
    dispatch(logoutUser)
    navigate("/login")
}
  return (
    /* Header */
    <div  className="fixed w-full flex items-center justify-between h-14 text-white z-10">
      <div className="flex items-center justify-start md:justify-center  pl-3 w-14 md:w-64 h-14 bg-blue-800 dark:bg-gray-800 border-none">
        <h1 style={{textDecorationThickness: '5rem', color: 'white', fontSize: '2.5rem',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}} className="hidden md:block ">HireLink</h1>
      </div>
      <div className="flex justify-between items-center h-14 bg-white dark:bg-gray-800 header-right">
      <div  className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-white dark:bg-gray-800 border-none">
        <img className="w-7 h-7 md:w-10 md:h-10 mr-2 rounded-md overflow-hidden" src="/avatar image.jpg" alt="Avatar" />
        <span className="hidden md:block font-bold text-blue-700">Hello,John Doe</span>
      </div>
        <ul className="flex items-center">
         
          <li>
            <div className="block w-px h-6 mx-3 bg-gray-400 dark:bg-gray-700"></div>
          </li>
          <li>
            <a style={{color:'blue'}} onClick={ handleLogout } href="" className="flex items-center mr-4 hover:text-blue-900">
              <span style={{color:'blue'}} className="inline-flex mr-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
              </span>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default Header;
