import React, { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../../Config/axios";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Pagination from "../../User/Employers/Pagination";
import { searchApplicants } from "../../../Services/EmployerApi";


const Candidates = () => {
  const navigate = useNavigate();
  const job = useSelector((state) => state.jobDetails.jobInfo);
  console.log("job:", job);
  const [data, setData] = useState([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(3);
  const [search, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `/api/employer/candidates?jobId=${job._id}&page=${currentPage}&limit=${candidatesPerPage}`
        );
        setData(response.data.applicants);
        setTotalApplicants(response.data.totalApplicants);
        const totalPages = Math.ceil(
          response.data.totalApplicants / candidatesPerPage
        );
        setTotalPages(totalPages);
        console.log("pqr:", response.data.applicants);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later");
        }
      }
    })();
  }, [currentPage, candidatesPerPage]);

  const [totalPages, setTotalPages] = useState(0);
  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0]; // Change format as needed
    }
    return ""; // Return a default value or empty string if dateString is falsy
  };
  

  const viewApplicant = (candidate) => {
    navigate(`/employer/applicant/${candidate._id}`, {
      state: { userDetails: candidate },
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Value:", search);
    searchApplicants({search:search}) // Pass the search term directly without nesting
      .then((res) => {
        console.log("Response:", res);
        setData(res.showApplicant);
      })
      .catch((error) => {});
  };
 
  

  const handleStatusChange = (appliedId) => {
    axios
      .put(`/api/employer/candidates/change-status/${appliedId}`)
      .then((response) => {
        // Display a success message
        toast.success(response.data.message);
      })
      .catch((error) => {
        // Display an error message
        console.error("Status update error:", error);

        toast.error("Failed to update status. Please try again later.");
      });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Candidates</h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          {/* <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div> */}
          <form onSubmit={handleSubmit}>
            <div className="block relative">
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z" />
                </svg>
              </span>
              <input
                type="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearchValue(e.target.value)}
                className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </div>
          </form>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email Address
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact Number
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    View
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Change Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Sample data rows */}
                {data.map((candidate) => (
                  <tr key={candidate._id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        {/* <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-full h-full rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                            alt=""
                          />
                        </div> */}
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {candidate.firstName} {candidate.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {candidate.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {candidate.userdetails?.contactNumber}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {" "}
                        {formatDate(candidate.appliedDate)}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        <VisibilityIcon
                          className="cursor-pointer"
                          sx={{ color: "#b3b300" }}
                          fontSize="small"
                          onClick={() => viewApplicant(candidate)}
                        />
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {candidate.appliedStatus ? (
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Applied</span>
                        </span>
                      ) : (
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Shortlisted</span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button
                    onClick={() => handleStatusChange(candidate.appliedId)}
                    className="text-blue-900 font-semibold px-3 py-1  cursor-pointer bg-blue-100 opacity-50 rounded-full"
                  >
                    Change status
                  </button>
                </td>
                  </tr>
                ))}
                
                {/* Add more data rows here */}
              </tbody>
            </table>
            <div className="">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
