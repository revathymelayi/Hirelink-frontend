import React from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "../../Config/axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, } = useForm({
    defaultValues: {
      email: ""
    }
  });
  const updatePasswordHandle = async (formData) => {
    try {
      const response = await axios.post("api/auth/forgot-password", formData);
      if (response && response.status === 200) {
        toast.success("Email has been sent. Please check the email to update your password");
        navigate("/forgot-password/email-verification");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-600 dark:text-white">
        <img className="w-48 h-10 mr-2" src="/hireLink.png" alt="logo" />
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl dark:text-white">
            Forgot Password
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={ handleSubmit(updatePasswordHandle) } action="#">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                { ...register("email", {
                  required: "Email is required",
                  validate: {
                    maxLength: (v) =>
                      v.length <= 50 || "The email should have at most 50 characters",
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "Email address must be a valid address",
                  },
                }) }
               
              />
               { errors.email?.message && (
                <small className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">{ errors.email.message }</small>
              ) }
            </div>
            <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Send email
                  </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Remember your password?{" "}
              
               <Link
                to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                Sign in
              
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
