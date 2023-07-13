import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const Payment = forwardRef(function ({ checkout, setCheckOut }, ref) {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-blue-100">
      <div className="absolute top-0 left-0 mt-6 ml-6">
        <img className="w-36" src="/hireLink.png" alt="logo" />
      </div>

      <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-xl dark:text-white">
        Supercharge your hiring process and access top talent with our premium employer features
      </h2>
      <p className="mb-6  font-normal text-gray-500 sm:px-16 xl:px-48 dark:text-gray-400">
        Make a payment today and unlock exclusive tools  to streamline your recruitment efforts and find the perfect candidates.
      </p>
      <p className="text-base font-semibold">
        Pay once, own it forever
      </p>

      {checkout ? (
        <div ref={ref}></div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl tracking-tight font-normal">
            $100
        
          <span className="text-sm font-semibold leading-6 tracking-wide ">
            USD
          </span>
          </p>
          <button
            className="mt-6 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            onClick={() => {
              setCheckOut(true);
            }}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      <div className="mt-6">
        <p>
          Already registered?{" "}
          <Link
            to="/"
            className="mt-4 leading-6 text-custom-yellow font-normal text-blue-700 hover:text-blue-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
});

export default Payment;
