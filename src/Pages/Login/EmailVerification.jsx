import React from "react";
import { Link } from "react-router-dom";

function EmailVerificationPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img className="w-48 h-10 mr-2" src="/hireLink.png" alt="logo" />
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
            Email Verification
          </h1>
          <p className="mb-4 text-gray-900 dark:text-white">
            Thank you for registering. An email has been sent to your email address for verification.
          </p>
          <p className="mb-4 text-gray-900 dark:text-white">
            Please click the verification link in the email to activate your account.
          </p>
          <p className="mb-4 text-gray-900 dark:text-white">
            If you didn't receive the email, please check your spam folder or{" "}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              click here
            </Link>{" "}
            to resend the verification email.
          </p>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already verified your email?{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationPage;
