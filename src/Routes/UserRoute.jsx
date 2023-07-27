import React, { Suspense, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../Components/User/Header";
import Loader from "../Components/Loader";
import Error from "../Components/Error";
import EmployerDetails from "../Components/User/Employers/EmployerDetails";
import Dashboard from "../Components/User/Dashboard/Dashboard";
import ProfileComplete from "../Components/User/MyProfile/ProfileComplete";
import EmployersList from "../Components/User/Employers/EmployersList";
import JobDetails from "../Components/User/Employers/JobDetails";
import Profile from "../Components/User/MyProfile/Profile"
import JobsList from "../Components/User/Jobs/JobsList";
import ViewJob from "../Components/User/Jobs/ViewJob";

const UserRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="">
      {/* Header */}
      {isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Header />
          {/* Body */}
          <main className="px-10 overflow-x-hidden md:px-8">
            <div className="mx-auto max-w-6xl sm:px-6 lg:px-8">
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile-complete" element={<ProfileComplete />} />
                <Route path="employers" element={<EmployersList />} />
                <Route
                  path="employer/details/:employerId"
                  element={<EmployerDetails />}
                />
                <Route path="job/details/:jobId" element={<JobDetails />} />
                <Route path="profile" element={<Profile/>} />
                <Route path='jobs'element={<JobsList/>}/>
                <Route path="job/view" element={<ViewJob/>}/>

                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </main>
        </Suspense>
      )}
    </div>
  );
};

export default UserRoute;
