import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "../../Config/axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const user = useSelector((state) => state.loggedUser.userInfo);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      currentPassword: "",
    },
  });
  const { newPassword, confirmPassword, currentPassword } = watch([
    "newPassword",
    "confirmPassword",
    "currentPassword",
  ]);
  const onSubmit = async (data, e) => {
    try {
      if (data) {
        const response = await axios.post(
          `api/employer/change/password?userId=${user._id}`,
          data
        );
        if (response.status === 200) {
          e.target.reset(); // Reset the form fields
          toast.success("Password updated successfully");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };

  return (
    <section className=" dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6  mx-auto md:h-contain lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-800 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Enter Your Current Password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  dark:placeholder-gray-400  ${
                  errors.currentPassword ? "border-red-500" : ""
                }`}
              />
              {errors.currentPassword && (
                <small className="mt-2 text-red-500 text-sm">
                  {errors.currentPassword.message}
                </small>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter Your New Password"
                {...register("newPassword", {
                  required: "New password is required",
                  pattern: {
                    value:
                      /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i,
                    message: "Password must be strong",
                  },
                })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              {errors.newPassword && (
                <small className="mt-2 text-red-500 text-sm">
                  {errors.newPassword.message}
                </small>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  pattern: {
                    value:
                      /((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/i,
                    message: "Password must be strong",
                  },
                })}
                className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <small className="mt-2 text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </small>
              )}
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
