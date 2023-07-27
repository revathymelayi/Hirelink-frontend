import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/Landing/LandingPage";
import PaymentPage from "./Pages/Signup/PaymentPage";
import ToastContainerBox from "./Config/ToastContainer";
import AdminAuth from "./Auth/AdminAuth";
import AdminRoute from "./Routes/AdminRoute";
import EmployerAuth from "./Auth/EmployerAuth";
import EmployerRoute from "./Routes/EmployerRoute";
import ProtectedAuth from "./Auth/ProtectedAuth";
import AuthRoute from "./Routes/AuthRoute";
import UserAuth from "./Auth/UserAuth";
import UserRoute from "./Routes/UserRoute";

const App = () => {
  return (
    <div>
      <ToastContainerBox />
      <Routes>
        <Route path="/" element={<LandingPage />} />
    
    <Route path="/payment/:userId" element ={<PaymentPage/>}/> 
        /*Admin */
        <Route element={<AdminAuth />}>
          <Route path="/admin/*" element={<AdminRoute />} />
        </Route>
        /*Employer */
        <Route element={<EmployerAuth />}>
          <Route path="/employer/*" element={<EmployerRoute />} />
        </Route>
        /*User */
        <Route element={ <UserAuth /> }>
          <Route path="/user/*" element={ <UserRoute /> } />
        </Route>
        /*Auth */
        <Route element={<ProtectedAuth />}>
          <Route path="/*" element={<AuthRoute />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
