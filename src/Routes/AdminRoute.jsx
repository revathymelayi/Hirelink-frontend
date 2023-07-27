import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../Components/Admin/Sidebar';
import AdminDashboard from '../Components/Admin/AdminDashboard';
import UsersList from '../Components/Admin/UsersList';
import EmployersList from '../Components/Admin/EmployersList';
import Header from '../Components/Admin/Header';
import Categories from '../Components/Admin/Category/Categories';
import Jobtypes from '../Components/Admin/JobType/Jobtypes'
import JobList from '../Components/Admin/Jobs/JobList';
import Error from '../Components/Error';


const AdminRoute = () => {
    return (
        <>
            <div className="flex h-screen">
                {/* Sidebar */ }
                <Sidebar />
                <div className="flex-grow">
                    {/* Header */ }
                    <Header />
                    {/* Body */ }
                    <div className="p-4">
                        <Routes>
                            <Route path="dashboard" element={ <AdminDashboard /> } />
                            <Route path="categories" element={ <Categories /> } />
                            <Route path="users" element={ <UsersList /> } />
                            <Route path="employers" element={ <EmployersList /> } />
                            <Route path ="jobtypes"  element={<Jobtypes/> }  />
                            <Route path= "jobs" element={<JobList/>} />
                            <Route path="*" element={ <Error /> } />
                            
                      
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminRoute;
