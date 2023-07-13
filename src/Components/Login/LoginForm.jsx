import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Config/axios";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loggedUserDetails } from "../redux-toolkit/slices/userSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  USER_ROLE,
  EMPLOYER_ROLE,
  ADMIN_ROLE,
  PENDING_EMPLOYER,
} from "../../utils/roles";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = watch(["email", "password"]);
  const onSubmit = async (data) => {
    if (data) {
      try {
        const response = await axios.post("/api/auth/user/login", input);
        if (response.status === 200) {
          const { accessToken, user } = response.data;
          Cookies.set("accessToken", accessToken);
          dispatch(loggedUserDetails(user));
          if (user.role === USER_ROLE) navigate("/user/dashboard");
          else if (user.role === EMPLOYER_ROLE) navigate("/employer/dashboard");
          else if (user.role === ADMIN_ROLE) navigate("/admin/dashboard");
          else if (user.role === PENDING_EMPLOYER)
            navigate(`/profile-complete/${user.firstName}/${user._id}`);
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

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      
      <div className="absolute top-0 left-0 mt-2 ml-6">
        <img className="w-36" src="/hireLink.png" alt="logo" />
      </div>
      <div style={{marginTop:'5rem'}}  class="w-full mt-12 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form
            class="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                })}
                onChange={(e) =>
                  setInput({
                    ...input,
                    email: e.target.value,
                  })
                }
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
              {errors.email && (
                <small className="mt-2 text-red-500 text-sm">
                  {errors.email.message}
                </small>
              )}
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                onChange={(e) =>
                  setInput({
                    ...input,
                    password: e.target.value,
                  })
                }
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
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
              Login with email
            </button>
            <div class="flex items-center justify-between">
              <Link
                to="/forgot-password"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>
          
            <p class="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                class="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
