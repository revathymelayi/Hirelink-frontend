import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="relative z-10 bg-primary py-[120px]">
      <div className="container">
        <div className="flex -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[400px] text-center">
              <h2 className="mb-2 text-[50px] font-bold leading-none text-[#3201d7] sm:text-[80px] md:text-[100px]">
                404
              </h2>
              <h4 className="mb-3 text-[22px] font-semibold leading-tight text-">
                Oops! That page can't be found
              </h4>
              <Link to="/">
              <button className="mt-5">
                <a className="relative inline-block text-sm font-medium text-[#3201d7] group active:text-[#3201d7] focus:outline-none focus:ring">
                  <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#3201d7] group-hover:translate-y-0 group-hover:translate-x-0"></span>

                  <span className="relative block px-8 py-3 bg-white border border-current">
                   Go Home 
                  </span>
                </a>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
