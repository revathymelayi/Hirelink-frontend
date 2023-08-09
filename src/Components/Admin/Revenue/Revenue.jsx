import React, { useState, useEffect } from 'react';
import { getRevenueDetails } from "../../../Services/AdminApi";
import { toast } from "react-toastify";
import Pagination from "../../User/Employers/Pagination";

const Revenue = () => {
  const [employerData, setEmployerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await getRevenueDetails(currentPage, itemsPerPage);
        setEmployerData(response.revenueData); // Update state with revenueData
        setTotalPages(Math.ceil(response.totalEmployersCount / itemsPerPage)); // Calculate total pages based on totalEmployersCount
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later");
        }
      }
    };
  
    fetchRevenueData();
  }, [currentPage, itemsPerPage]);
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Change format as needed
  };
  const [totalPages, setTotalPages] = useState(0)
  const handlePageChange = (page) => {
    setCurrentPage(page);
};
  return (
    <div className="ml-80 mt-20">
      <section className="container mx-auto p-6">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {employerData.map((data, index) => (
                  <tr className="text-gray-700" key={index}>
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                          <img
                            className="object-cover w-full h-full rounded-full"
                          
                            src={`https://thecartzilla.shop/user/${data.logo}`}
                            alt=""
                            loading="lazy"
                          />
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{data.employerName}</p>
                          <p className="text-xs text-gray-600">{data.websiteUrl}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 border text-ms font-semibold">{data.email}</td>
                    <td className="px-4 py-3 border text-xs">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">$ {data.amount} </span>
                    </td>
                    <td className="px-4 py-3 border text-sm">{formatDate(data.transactionDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Pagination
                currentPage={ currentPage }
                totalPages={ totalPages }
                onPageChange={ handlePageChange }
            />
     
    </div>
  );
};

export default Revenue;
