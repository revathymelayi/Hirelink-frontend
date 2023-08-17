import React, { useState,useEffect } from 'react';
import axios from "../../Config/axios"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { BASE_URL } from "../../utils/urls"
import { employerDetails } from '../../Components/redux-toolkit/slices/employerSlice';

const CompanySlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [employers, setEmployers] = useState([]);
  const user = useSelector((state) => state.loggedUser.userInfo)

  useEffect(() => {
    (async () => {
        const fetchEmployers = await axios.get(`api/auth/employers`)
        setEmployers(fetchEmployers.data.employers);
       
    })()
}, [  employers.length]);
    const [transform, setTransform] = useState(0);
    
   
    const goNext = () => {
      const maxTransform = -398 * (employers.length - 1);
      if (transform > maxTransform) {
        setTransform((prevTransform) => prevTransform - 398);
      }
    };
    
    
    const goPrev = () => {
      if (transform < 0) {
        setTransform((prevTransform) => prevTransform + 398);
      }
    };

    const showEmployerDetails = (employer) => {
      dispatch(employerDetails(employer))
      navigate(`/user/employer/details/${ employer._id }`)
  }
    
   
   
    return (
      <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
        <div className="w-full relative flex items-center justify-center">
          <button
            aria-label="slide backward"
            className="absolute z-30 left-0 ml-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer"
            onClick={goPrev}
            id="prev"
          >
            <svg
              className="dark:text-gray-900"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1L1 7L7 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
            <div
              id="slider"
              className="h-full flex lg:gap-6 md:gap-2 gap-6 items-center justify-start transition ease-out duration-700"
              style={{ transform: `translateX(${transform}px)` }}
              size={ 9 }
            >
              { employers.map((employer, index) => (
              <div className="flex flex-shrink-0 relative w-full sm:w-auto cursor-pointer" key={ index } onClick={ () => showEmployerDetails(employer) }>
                <div className="flex flex-col justify-center items-center h-[40vh]">
                  <div className="relative flex flex-col items-center border rounded-[20px] w-[300px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                    <div className="relative flex h-28 w-full justify-center rounded-xl bg-cover">
                      <img
                         src={`${BASE_URL}/user/${
                          employer.employerdetails.coverPhoto
                            ? employer.employerdetails.coverPhoto
                            : ""
                        }`}
                        className="absolute flex h-28 w-full justify-center  bg-cover"
                        alt="Banner"
                      />
                      <div className="absolute -bottom-12 flex h-[60px] w-[60px] items-center justify-center square-full border-[4px] border-white bg-white dark:!border-navy-700">
                        <img
                          className="h-full w-full rounded-full"
                          src={`${BASE_URL}/user/${
                            employer.employerdetails.logo
                              ? employer.employerdetails.logo
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                 
                    <div className="mt-16 flex flex-col items-center">
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        {employer.firstName}
                      </h4>
                      <p className="text-base font-normal text-gray-600">
                        {employer.employerdetails.websiteUrl}
                      </p>
                    </div>
                    
                   
                  </div>
                 
                </div>
              </div>


             
              ))}
             
              
            </div>
          </div>
          <button
            aria-label="slide forward"
            className="absolute z-30 right-0 mr-10 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            onClick={goNext}
            id="next"
          >
            <svg
              className="dark:text-gray-900"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default CompanySlider;
  