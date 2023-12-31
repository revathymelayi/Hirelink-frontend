import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux-toolkit/slices/userSlice";
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import { BellIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: "Dashboard", href: "/user/dashboard", current: false },
  { name: "Companies", href: "/user/employers", current: false },
  { name: "jobs", href: "/user/jobs", current: false },
  
];
const userNavigation = [
  { name: "My Account", href: "#", id: "account" },
  { name: "Sign out", href: "#", id: "signout" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ notifications, setNotifications, setSelectedChat} ) {
  const user = useSelector((state) => state.loggedUser.userInfo);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.map((item) => {
      if (item.href === pathname) {
        item.current = true;
      }
    });
  }, [pathname]);
  const handleClick = (id) => {
    if (id === "signout") {
      Cookies.remove("accessToken");
      dispatch(logoutUser);
      navigate("/login");
    } else if (id === "account") {
      navigate("/user/profile");
    }
  };
  const handleChatIconClick = () => {
  
    navigate("/user/chats");
  };


  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState("");

  const setSelectedText = (txt) => {
    setText(txt);
    setDropDown(true);
  };

  return (
    <div className="2xl:container 2xl:mx-auto ">
      <div className="bg-white rounded shadow-lg py-5 px-7">
        <nav className="flex justify-between">
          <div className="flex items-center space-x-3 lg:pr-16 pr-6">
            <h2 className="font-normal text-2xl leading-6">
              <span
                style={{
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  backgroundImage:
                    "linear-gradient(to right, #0000d9,#3a00ca,#9f00ca)",
                  fontWeight: "bold",
                }}
              >
                HireLink
              </span>
            </h2>
          </div>
          {/* For medium and plus sized devices */}
          <div className="hidden md:flex flex-auto space-x-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`${
                  item.current
                    ? "text-white bg-blue-700"
                    : "text-gray-700 border hover:bg-blue-700 hover:text-white"
                }     px-3 py-2.5 font-normal text-sm leading-3 shadow-md rounded`}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className=" flex space-x-5 justify-center items-center pl-2">
            
            <div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 "
             onClick={handleChatIconClick}
            >
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                  stroke="#1F2937"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="animate-ping w-1.5 h-1.5 bg-blue-700 rounded-full absolute -top-1 -right-1 m-auto duration-200" />
              <div className=" w-1.5 h-1.5 bg-blue-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg" />
            </div>
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex items-center text-gray-600">
                  <span className="sr-only">View notifications</span>
                  <Stack spacing={2} direction="row">
                    <Badge
                      badgeContent={
                        notifications.length > 0 ? notifications.length : "0"
                      }
                      color="secondary"
                    >
                      <BellIcon
                        className="h-6 w-6 text-gray-700"
                        color="action"
                      />
                    </Badge>
                  </Stack>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 w-40 mt-2 py-2  text-white bg-blue-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* Dropdown menu content */}
                  { !notifications.length && <span className='block px-4 py-5 text-sm text-white cursor-pointer'>No New Messages</span> }
                  {notifications.map((item) => (
                    <Menu.Item key={item._id}>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            setSelectedChat(item.sender._id);
                            setNotifications(
                              notifications.filter((n) => n !== item)
                            );
                          }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-8 py-8 text-sm text-gray-700 cursor-pointer"
                          )}
                        >
                          {`New Message from ${item.sender.firstName} `}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex items-center text-gray-600">
               
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
               
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 w-40 mt-2 py-2  text-white bg-blue-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* Dropdown menu content */}
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            handleClick(item.id);
                          }}
                          className={`block px-2 py-2 text-sm ${
                            (active ? "bg-gray-100" : "", "cursor-pointer")
                          }`}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </nav>
        {/* for smaller devcies */}
        <div className="block md:hidden w-full mt-5 ">
          <div
            onClick={() => setDropDown(!dropDown)}
            className="cursor-pointer px-4 py-3 text-white bg-blue-600 rounded flex justify-between items-center w-full"
          >
            <div className="flex space-x-2">
              <span
                id="s1"
                className={`${
                  text.length != 0 ? "" : "hidden"
                } font-semibold text-sm leading-3`}
              >
                Selected:{" "}
              </span>
              <p
                id="textClicked"
                className="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer "
              >
                {text ? text : "Collections"}
              </p>
            </div>
            <svg
              id="ArrowSVG"
              className={`${
                dropDown ? "" : "rotate-180"
              } transform duration-100`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className=" relative">
            <ul
              id="list"
              className={`${
                dropDown ? "hidden" : "block"
              } font-normal text-base leading-4 absolute top-2  w-full rounded shadow-md`}
            >
              <Link to='/user/dashboard'>
              <li
                onClick={() => setSelectedText("Dashboard")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Dashboard
              </li>
              </Link>
              <Link to='/user/employers'>
              <li
                onClick={() => setSelectedText("Employers")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Employers
              </li>
              </Link>
              <Link to='/user/jobs'>
              <li
                onClick={() => setSelectedText("Jobs")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Jobs
              </li>
              </Link>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
