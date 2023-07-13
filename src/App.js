import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import SignupPage from "./Pages/Signup/SignupPage";
import ProfileCompletePage from "./Pages/Signup/ProfileCompletePage";
import UpdatePasswordPage from "./Pages/Login/UpdatePasswordPage";
import ForgotPasswordPage from "./Pages/Login/ForgotPasswordPage";
import EmailVerification from "./Pages/Login/EmailVerification";
import PaymentPage from "./Pages/Signup/PaymentPage";
import ToastContainerBox from "./Config/ToastContainer";
import AdminAuth from "./Auth/AdminAuth";
import AdminRoute from "./Routes/AdminRoute";
import EmployerAuth from "./Auth/EmployerAuth";
import EmployerRoute from "./Routes/EmployerRoute"


const App = () => {
  return (
  <div>
    <ToastContainerBox/>
    <Routes>
    <Route path="/" element={ <LoginPage /> } />
    <Route path="/register" element={ <SignupPage /> } />
    <Route path="/profile-complete/:username/:userId" element={ <ProfileCompletePage /> } />
    <Route path="/forgot-password" element={ <ForgotPasswordPage /> } />
    <Route path="/forgot-password/email-verification" element={ <EmailVerification /> } />
    <Route path="/user/forgotPassword" element={ <UpdatePasswordPage /> } />
    <Route path="/payment/:userId" element ={<PaymentPage/>}/>
    /*Admin */
        <Route element={ <AdminAuth /> }>
          <Route path="/admin/*" element={ <AdminRoute /> } />
        </Route>
    /*Employer */
         <Route element={<EmployerAuth/>}>
           <Route path="/employer/*" element={<EmployerRoute/>}/>
         </Route>
    </Routes>
  </div>
  )
}

export default App
