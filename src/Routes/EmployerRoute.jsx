import React, { useEffect, useState, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AddJob from "../Components/Employer/Job/AddJob";
import ListJob from "../Components/Employer/Job/ListJob";
import EditJob from "../Components/Employer/Job/EditJob";
import ViewJob from "../Components/Employer/Job/ViewJob";
import Header from "../Components/Employer/Header";
import Account from "../Components/MyAccount/Account";
import Loader from "../Components/Loader";
import Error from '../Components/Error';
import Dashboard from "../Components/Employer/Dashboard/Dashboard";
import Candidates from "../Components/Employer/Candidates/Candidates";
import ViewCandidate from "../Components/Employer/Candidates/ViewCandidate"
import Messages from '../Components/Messages/Messages';

const EmployerRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const [notifications, setNotifications] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");
  return (
    <>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            {/* Header */}
            <Header  notifications={ notifications } setNotifications={ setNotifications } setSelectedChat={ setSelectedChat } />
            {/* Body */}
            <main className="py-1">
              <div className="mx-auto py-10 max-w-6xl sm:px-6 lg:px-8 ">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="add-job" element={<AddJob />} />
                  <Route path="jobs" element={<ListJob />} />
                  <Route path="job/:jobId" element={<ViewJob />} />
                  <Route path="edit/:jobId" element={<EditJob />} />
                  <Route path="account" element={<Account />} />
                  <Route path ="candidates/:jobId" element={<Candidates/>}/>
                  <Route path="applicant/:userId" element={<ViewCandidate />}/>
                  <Route path="chats" element={ <Messages setNotifications={ setNotifications } notifications={ notifications } selectedChat={ selectedChat } /> } />
                  <Route path="*" element={ <Error /> } />
                </Routes>
              </div>
            </main>
          </Suspense>
        )}
      </div>
    </>
  );
};

export default EmployerRoute;
