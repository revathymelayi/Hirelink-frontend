import React, { useState, useEffect } from "react";
import axios from "../../../Config/axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/urls";
import { useNavigate } from "react-router-dom";
import { employerDetails } from "../../redux-toolkit/slices/employerSlice";
import { searchEmployer } from "../../../Services/UserApi";
import Pagination from "./Pagination";

function EmployerList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const user = useSelector((state) => state.loggedUser.userInfo);
  const [currentPage, setCurrentPage] = useState(1)
  const [employersPerPage] = useState(6)

  useEffect(() => {
    (async () => {
      const fetchEmployers = await axios.get(
        `api/user/employers?userId=${user._id}&page=${ currentPage }&limit=${ employersPerPage }`
      );
      const totalEmployers = fetchEmployers.data.totalEmployersCount
      const totalPages = Math.ceil(totalEmployers / employersPerPage);
      setTotalPages(totalPages);
      setEmployers(fetchEmployers.data.employers);
    })();
  }, [currentPage, employersPerPage]);

  const showEmployerDetails = (employer) => {
    console.log(employer);
    console.log("12345");
    dispatch(employerDetails(employer));
    navigate(`/user/employer/details/${employer._id}`);
  };
  const [search, setSearchValue] = useState("");
  const [totalPages, setTotalPages] = useState(0)
  const handleSubmit = (e) => {
    e.preventDefault();
    searchEmployer(search)
      .then((res) => {
        setEmployers(res.showEmployer);
      })
      .catch((error) => {});
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <div className="relative mb-4 flex w-1/2 flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              aria-label="Search"
              aria-describedby="button-addon1"
            />

            <button type="submit" className="bg-blue-700 text-white px-6 text-lg font-semibold py-2 rounded-r-md">
              Go
            </button>
          </div>
        </div>
      </form>
      <div className="mb-4 sm:mb-0 md:mb-0 lg:mb-0 xl:mb-0 lg:w-1/2">
        <h2 className="text-gray-800 dark:text-gray-100 text-lg font-bold">
          Popular Companies
        </h2>
      </div>
      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
        {employers.map((employer, index) => (
          <div
            className="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4"
            key={index}
            onClick={() => showEmployerDetails(employer)}
          >
            <div className="flex space-x-6 items-center">
              <img
                src={`${BASE_URL}/user/${
                  employer.employerdetails.logo
                    ? employer.employerdetails.logo
                    : ""
                }`}
                className="w-auto h-12"
                alt="logo"
              />
              <div>
                <p className="font-semibold text-base">
                  {employer.employerdetails.companyName
                    ? employer.employerdetails.companyName
                    : ""}{" "}
                </p>
                <p className="font-semibold text-xs text-gray-400">
                  {employer.employerdetails.city
                    ? employer.employerdetails.city
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex space-x-2 items-center">
              {/* <div className="bg-yellow-200 rounded-md p-2 flex items-center">
              <p className="text-yellow-600 font-semibold text-xs">-C4,678</p>
            </div> */}
            </div>
          </div>
        ))}
       
      </div>
     
      <Pagination
                currentPage={ currentPage }
                totalPages={ totalPages }
                onPageChange={ handlePageChange }
            />
     
      
    </>
  );
}
export default EmployerList;
