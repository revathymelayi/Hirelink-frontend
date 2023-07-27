import React, { useState } from 'react';

const CompanySlider = () => {
    const [transform, setTransform] = useState(0);
  
    const goNext = () => {
      setTransform((prevTransform) => prevTransform - 398);
    };
  
    const goPrev = () => {
      setTransform((prevTransform) => prevTransform + 398);
    };
  
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
              className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700"
              style={{ transform: `translateX(${transform}px)` }}
            >

              <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                <div className="flex flex-col justify-center items-center h-[100vh]">
                  <div className="relative flex flex-col items-center border rounded-[20px] w-[300px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                    <div className="relative flex h-32 w-full justify-center rounded-xl bg-cover">
                      <img
                        src="/images/giantEagle.jpg"
                        className="absolute flex h-32 w-full justify-center  bg-cover"
                        alt="Banner"
                      />
                      <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                        <img
                          className="h-full w-full rounded-full"
                          src="/images/giant eagle.jpg"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div className="mt-16 flex flex-col items-center">
                      <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        Adela Parkson
                      </h4>
                      <p className="text-base font-normal text-gray-600">
                        Product Manager
                      </p>
                    </div>
                    <div className="mt-6 mb-3 flex gap-14 md:!gap-14">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold text-navy-700 dark:text-white">
                          17
                        </p>
                        <p className="text-sm font-normal text-gray-600">
                          Posts
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold text-navy-700 dark:text-white">
                          9.7K
                        </p>
                        <p className="text-sm font-normal text-gray-600">
                          Followers
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-2xl font-bold text-navy-700 dark:text-white">
                          434
                        </p>
                        <p className="text-sm font-normal text-gray-600">
                          Following
                        </p>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>


             
             
             
              {/* Add more slide elements here */}
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
  