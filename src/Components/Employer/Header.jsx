import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux-toolkit/slices/userSlice";

const navigation = [
  { name: "Dashboard", href: "/employer/dashboard", current: false },
  { name: "Job List", href: "/employer/jobs", current: false },
  { name: "Candidates", href: "/employer/candidates", current: false },
  { name: "Post a Job", href: "/employer/add-job", current: false },
];
const userNavigation = [
  { name: "My Account", href: "#", id: "account" },
  { name: "Sign out", href: "#", id: "signout" },
];

export default function Header() {
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
      navigate("/employer/account");
    }
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
                  backgroundImage: "linear-gradient(to right, #0000d9,#3a00ca,#9f00ca)",
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
            <div className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
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
            <svg
              className="cursor-pointer  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 "
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex items-center text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
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
                            active ? "bg-gray-100" : "",
                                    'cursor-pointer'
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
              <li
                onClick={() => setSelectedText("Arts")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Dashboard
              </li>
              <li
                onClick={() => setSelectedText("Space")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Jobs
              </li>
              <li
                onClick={() => setSelectedText("Game")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Game
              </li>
              <li
                onClick={() => setSelectedText("Utility")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Utility
              </li>
              <li
                onClick={() => setSelectedText("Cards")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
              >
                Cards
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
