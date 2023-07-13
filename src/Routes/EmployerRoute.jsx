import React from "react";
import { Route, Routes } from "react-router-dom";
import AddJob from "../Components/Employer/Job/AddJob";
import ListJob from "../Components/Employer/Job/ListJob";
import EditJob from "../Components/Employer/Job/EditJob";
import ViewJob from "../Components/Employer/Job/ViewJob";
import Header from "../Components/Employer/Header";

const EmployerRoute = () => {
  return (
    <>
      <div>
        {/* Header */}
        <Header />
        {/* Body */}
        <main className="py-1">
          <div className="mx-auto py-10 ">
            <Routes>
              <Route path="add-job" element={<AddJob />} />
              <Route path="jobs" element={<ListJob />} />
              <Route path="job/:jobId" element={<ViewJob/>}/>
              <Route path="edit/:jobId" element={<EditJob/>}/>
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default EmployerRoute;
