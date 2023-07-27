import React from "react";
import { Link } from "react-router-dom";
import JobSlider from "./JobSlider";
import ComapnySlider from "./ComapnySlider";
const LandingPage = () => {
  return (
    <div>
      <div className="section font-semibold px-4 h-20 sm:px-8 md:px-16 text-gray-800 fixed w-full top-0 flex header_section bg-white shadow z-10">
        <div className="sub_head flex my-auto py-3">
          <div
            style={{
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              backgroundImage:
                "linear-gradient(to right, #0000d9,#3a00ca,#9f00ca)",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              fontSize: "28px",
            }}
            className="text ml-2 my-auto flex-none  sm:text-base"
          >
            HireLink
          </div>
        </div>
        <div className="sub_head ml-auto flex space-x-4 sm:space-x-8 my-auto">
          <div className="h_btns cursor-pointer">Home</div>
          {/* <button className="h_btns cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Login
          </button> */}
          <Link to="/login">
            <button className="relative group overflow-hidden px-2 h-8 rounded-full flex space-x-2 items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:to-blue-700">
              <span className="relative text-sm text-white">Login</span>
            </button>
          </Link>
          {/* <div className="h_btns cursor-pointer">Login</div> */}
        </div>
      </div>

      <section
        className="h-screen bg-cover mt-10"
        style={{ backgroundImage: "url('/images/hero@3x.jpeg')" }}
      >
        <div className="flex h-full w-full items-center justify-center container mx-auto px-4 sm:px-8">
          <div className=" text-center">
            <h1
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                backgroundImage: "linear-gradient(to right, #0000d9,#3a00ca)",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                fontSize: "60px",
              }}
              className="mt-40 "
            >
              Find work you'll love,fast.
            </h1>

            {/* <form >
            <div className="mt-8 flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
              <input
                id="email"
                type="text"
                className="rounded-md border border-transparent bg-white/20 px-4 py-2 text-white placeholder-white backdrop-blur-sm focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                placeholder="Email Address"
              />

              <button
                type="submit"
                className="transform rounded-md bg-blue-700 px-8 py-2 text-sm font-medium capitalize tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              >
                Notify Me
              </button>
            </div>
          </form> */}
            <div class="max-w-2xl mx-auto">
              <form>
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"

                    placeholder="Search Job,Companies..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div
        style={{
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundImage: "linear-gradient(to right, #3201d8,#3a00ca,#9f00ca)",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          fontSize: "28px",
        }}
        className="heading_section italic bg-white font-semibold text-3xl text-center p-5 pt-24 text-blue-800"
      >
        Jobs Hiring Now
      </div>

      <JobSlider />

      <div className="section py-28 w-full scree border grid md:grid-cols-2 bg-white text-gray-800">
        <div className="subsec flex-none overflow-hidden max-h-96">
          <img className="w-full" src="/images/banner3.jpg" alt="Pizza" />
        </div>
        <div className="subsec my-auto p-8">
          <div className="title font-semibold text-3xl mb-5">
            Let the jobs find you
          </div>
          <div className="desc text-lg">
            Create your free profile to get interview invites and jobs that work
            for you.
            <Link to="/login">
            <button className="relative mt-10 group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-blue-700">
              <span className="relative text-sm text-white">Get Hired</span>
              <div className="flex items-center -space-x-3 translate-x-3">
                <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
            </Link>
          </div>
        </div>
        <div className="subsec my-auto p-8">
          <div className="title font-semibold text-3xl mb-5">
            Skip the paperwork
          </div>
          <div className="desc text-lg">
            Your profile is your application. Apply to jobs instantly.
            <Link to="/login">
            <button className="relative mt-10 group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-blue-700">
              <span className="relative text-sm text-white">
                Create Profile
              </span>
              <div className="flex items-center -space-x-3 translate-x-3">
                <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
            </Link>
          </div>
        </div>
        <div className="subsec flex-none overflow-hidden max-h-96">
          <img className="w-full" src="/images/banner2.jpg" alt="Pizza" />
        </div>
        <div className="subsec flex-none overflow-hidden max-h-96">
          <img className="w-full" src="/images/banner5.jpg" alt="Pizza" />
        </div>
        <div className="subsec my-auto p-8">
          <div className="title font-semibold text-3xl mb-5">
            Your job is personal
          </div>
          <div className="desc text-lg">
            Tell us more about your goals and we'll match you with the right
            jobs to help you reach them..
            <Link to="/login">
            <button className="relative mt-10 group overflow-hidden px-6 h-12 rounded-full flex space-x-2 items-center bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-blue-700">
              <span className="relative text-sm text-white">See Jobs</span>
              <div className="flex items-center -space-x-3 translate-x-3">
                <div className="w-2.5 h-[1.6px] rounded bg-white origin-left scale-x-0 transition duration-300 group-hover:scale-x-100"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 stroke-white -translate-x-2 transition duration-300 group-hover:translate-x-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          backgroundImage: "linear-gradient(to right, #3201d8,#3a00ca,#9f00ca)",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          fontSize: "28px",
        }}
        className="heading_section italic bg-white font-semibold text-3xl text-center p-5 pt-24 text-blue-800"
      >
        Top Comapnies
      </div>

      <ComapnySlider />
      <div className="heading_section   bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="footer w-5/6 mx-auto text-center">
          <div className="sub flex-1 p-8">
            <div className="text-3xl mb-3 uppercase">Contact Us</div>
            <div className="info">
              <div className="name">HireLink</div>
              <div className="name text-sm">
                Street 4996 Brown Bear Drive <br />
                City Mira Loma State CA State Full California <br />
                Zip Code 91752 <br />
                Phone Number 951-634-4557 <br />
                Mobile Number 951-903-8940
              </div>
            </div>
          </div>
          <div className="sub flex p-5 w-5/6 mx-auto border-t">
            <div className="cursor-pointer hover:underline items mx-auto">
              Our Partners
            </div>
            <div className="cursor-pointer hover:underline items mx-auto">
              Policy
            </div>
            <div className="cursor-pointer hover:underline items mx-auto">
              Facilities
            </div>
            <div className="cursor-pointer hover:underline items mx-auto">
              Developer
            </div>
          </div>
        </div>
      </div>

      {/* <div className="filling pt-14"></div> */}
    </div>
  );
};

export default LandingPage;
