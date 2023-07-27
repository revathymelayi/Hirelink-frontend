import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Config/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { USER_ROLE, PENDING_EMPLOYER } from "../../utils/roles";
import SignupEmailVerification from "./SignupEmailVerification";
export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      role: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { firstName, lastName, email, password, confirmPassword } = watch([
    "firstName",
    "lastName",
    "email",
    "password",
    "confirmPassword",
  ]);

  const navigate = useNavigate();
  const [showSignupForm, setSignupForm] = useState(true);
  const [showVerificationModal, setVerificationModal] = useState(false);
  const [isemail, setEmail] = useState("");
  const [isUser, setUser] = useState("");




  const onSubmit = async (data) => {
    if (data) {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match!");
        return; // Don't proceed with the form submission
      }
      try {
        const response = await axios.post("api/auth/user/register", data);
        if (response.status === 200) {
          setVerificationModal(true);
          setSignupForm(false);
          setEmail(data.email);
          setUser(response.data.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later");
        }
      }
    }
  };
  return showSignupForm ? (
    <>
      <div
        style={{ marginTop: "2rem" }}
        className="flex flex-col md:flex-row justify-center items-center  "
      >
        <div className="absolute top-0 left-0 mt-2 ml-6">
          <Link to="/">
            <img className="w-36" src="/hireLink.png" alt="logo" />
          </Link>
        </div>
        <div className="w-full md:w-1/2 h-screen bg-white hidden md:block">
          <img
            src="./beautiful-blonde-with-curly-hair.jpg"
            className="object-contain h-screen w-screen hidden md:block"
            alt=""
          />
        </div>

        <div className="w-full md:w-1/2 ">
          <div className="flex flex-col items-center justify-center h-full px-8 py-8 md:px-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 md:space-y-4 sm:p-6">
                <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white"></h1>
                <form
                  className="space-y-2 md:space-y-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <h2 className="mb-3">Who are you?</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value={USER_ROLE}
                          {...register("role", {
                            required: "Role is required",
                          })}
                          name="role"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-blue-700"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          USER
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value={PENDING_EMPLOYER}
                          {...register("role", {
                            required: "Role is required",
                          })}
                          name="role"
                          className="w-4 h-4 text-blue-600 bg-gray-100 dark:ring-offset-gray-800 dark:bg-gray-700"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          EMPLOYER
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3 md:mb-0">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-first-name"
                      >
                        First Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 focus:bg-white"
                        id="grid-first-name"
                        name="firstName"
                        type="text"
                        autoComplete="text"
                        {...register("firstName", {
                          required: "First Name is required",
                          pattern: {
                            value: /^(?=.*\S)[A-Za-z\s]+$/i,
                            message: "Name should only contain letters",
                          },
                        })}
                      />
                      {errors.firstName && (
                        <small className="mt-2 text-red-500 text-sm">
                          {errors.firstName.message}
                        </small>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="grid-last-name"
                      >
                        Last Name
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-last-name"
                        type="text"
                        name="lastName"
                        autoComplete="text"
                        {...register("lastName", {
                          required: "Last Name is required",
                          pattern: {
                            value: /^(?=.*\S)[A-Za-z\s]+$/i,
                            message: "Name should only contain letters",
                          },
                        })}
                      />
                      {errors.lastName && (
                        <small className="mt-2 text-red-500 text-sm">
                          {errors.lastName.message}
                        </small>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
                          message: "Email does'nt match",
                        },
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.email && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.email.message}
                      </small>
                    )}
                  </div>
                  <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", {
                          required: "Password must be strong",
                          pattern: {
                            value:
                              /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i,
                            message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one special character ",
                          },
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.password && (
                        <small className="mt-2 text-red-500 text-sm">
                          {errors.password.message}
                        </small>
                      )}
                    </div>
                  <div>
                      <label
                        htmlFor="Confirm password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="current-password"
                        {...register("confirmPassword", {
                          required: "Password must match",
                          pattern: {
                            value:
                              /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i,
                            message: "Password do not match",
                          },
                        })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.password && (
                        <small className="mt-2 text-red-500 text-sm">
                          {errors.password.message}
                        </small>
                      )}
                    </div>

                
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : showVerificationModal ? (
    <SignupEmailVerification email={isemail} user={isUser} />
  ) : (
    ""
  );
}
