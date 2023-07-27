import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../Pages/Login/LoginPage";
import SignupPage from "../Pages/Signup/SignupPage";
import ProfileCompletePage from "../Pages/Signup/ProfileCompletePage";
import UpdatePasswordPage from "../Pages/Login/UpdatePasswordPage";
import ForgotPasswordPage from "../Pages/Login/ForgotPasswordPage";
import EmailVerification from "../Pages/Login/EmailVerification";
import PaymentPage from "../Pages/Signup/PaymentPage";
import Error from '../Components/Error';

const AuthRoute = () => {
  return (
    <>
      <div>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
          <Route
            path="profile-complete/:username/:userId"
            element={<ProfileCompletePage />}
          />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="forgot-password/email-verification"
            element={<EmailVerification />}
          />
          <Route path="updatePassword" element={<UpdatePasswordPage />} />
          <Route path="payment/:userId" element={<PaymentPage />} />
          <Route path="*" element={ <Error /> } />
        
        </Routes>
      </div>
    </>
  );
};

export default AuthRoute;

