import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../Config/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { loggedUserDetails } from "../redux-toolkit/slices/userSlice";

function ProfileComplete() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, userId } = useParams();
  console.log(useParams())
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    defaultValues: {
      companyName: "",
      registrationNumber: "",
      websiteUrl: "",
      contactNumber: "",
      address: "",
      zip: ""
    }
  });

  const handleProfileComplete = async (data) => {
    try {
      const updatedUserInput = {
        ...data,
        userId: userId // Add userId to the userInput object
      };

      const response = await axios.post("/api/auth/user/profile-complete", updatedUserInput);
      if (response.status === 200) {
        const { accessToken, user } = response.data;
        Cookies.set("accessToken", accessToken);
        dispatch(loggedUserDetails(user));
        toast.success("User Profile updated Successfully");
        navigate(`/payment/${user._id}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later");
      }
    }
  };

  const handleInputChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const companyName = watch("companyName");
  const registrationNumber = watch("registrationNumber");
  const websiteUrl = watch("websiteUrl");
  const contactNumber = watch("contactNumber");
  const address = watch("address");
  const zip = watch("zip");

  return (
    <div>
      <a href="#" className="flex items-center mb-6 mt-4 text-2xl font-semibold text-gray-5 dark:text-white">
        <img className="w-48 h-10 mr-8 ml-8" src="/hireLink.png" alt="logo" />
      </a>
      <h1 className="text-2xl font-bold mb-6 text-center">Hey {username}, Complete Your Profile</h1>
      <h5 className="text-l mb-6 text-center">Set up an account for your business in less than a minute.</h5>

      <div className="flex justify-center">
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit(handleProfileComplete)}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  {...register("companyName", { required: true })}
                  value={companyName}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.companyName && <span className="text-red-500">Company Name is required</span>}
              </div>
              <div>
                <label
                  htmlFor="Registration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="register"
                  {...register("registrationNumber", { required: true })}
                  value={registrationNumber}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.registrationNumber && <span className="text-red-500">Registration Number is required</span>}
              </div>
              <div>
                <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  {...register("websiteUrl", { required: true })}
                  value={websiteUrl}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.websiteUrl && <span className="text-red-500">Website URL is required</span>}
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("contactNumber", { required: true })}
                  value={contactNumber}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.contactNumber && <span className="text-red-500">Contact Number is required</span>}
              </div>
              <div>
                <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address", { required: true })}
                  value={address}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.address && <span className="text-red-500">Address is required</span>}
              </div>
              <div>
                <label htmlFor="Zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Zip
                </label>
                <input
                  type="text"
                  id="zip"
                  {...register("zip", { required: true })}
                  value={zip}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.zip && <span className="text-red-500">Zip is required</span>}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Complete Profile
              </button>
              <Link
                to={`/payment/${userId}`}
                className="inline-block text-sm font-medium text-blue-600 transition-colors duration-200 transform hover:text-blue-700"
              >
                
              </Link>
            </div>
            <p>
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-blue-700 hover:underline dark:text-blue-600"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileComplete;

