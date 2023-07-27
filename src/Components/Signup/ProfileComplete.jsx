import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../Config/axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { signupUserDetails } from "../redux-toolkit/slices/signupSlice";

function ProfileComplete() {
  const dispatch = useDispatch();
  const { username, userId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      registrationNumber: "",
      websiteUrl: "",
      contactNumber: "",
      address: "",
      zip: "",
      userBio: "",
      country: "",
      city: "",
      state: "",
      logo: "",
      coverPhoto: "",
    },
  });
  const {
    companyName,
    registrationNumber,
    websiteUrl,
    contactNumber,
    address,
    zip,
    userBio,
    country,
    city,
    state,
    logo,
    coverPhoto,
  } = watch([
    "companyName",
    "registrationNumber",
    "websiteUrl",
    "contactNumber",
    "address",
    "zip",
    "userBio",
    "country",
    "city",
    "state",
    "logo",
    "coverPhoto",
  ]);
  const [selectedCompanyLogo, setCompanyLogo] = useState("");
  const [showCompanyImage, setCompanyImage] = useState("");

  const [selectedCoverPic, setCoverPic] = useState("");
  const [showCoverImage, setCoverImage] = useState("");
  
  const handleCompanyLogoChange = (e) => {
    console.log(123456)
    console.log("handleCompanyLogoChange called");
    setCompanyLogo(e.target.files[0]);
    setCompanyImage(URL.createObjectURL(e.target.files[0]));
    console.log("Selected logo:", e.target.files[0]);
    console.log("Show company image:", showCompanyImage);
  };
  const handleCoverPhotoChange = (e) => {
    setCoverPic(e.target.files[0]);
    setCoverImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleProfileComplete = async (data) => {
    try {
      
      if (data) {
        const formData = new FormData();
        // console.log(data)
        formData.append("companyName", data.companyName);
        formData.append("registrationNumber", data.registrationNumber);
        formData.append("websiteUrl", data.websiteUrl);
        formData.append("contactNumber", data.contactNumber);
        formData.append("address", data.address);
        formData.append("zip", data.zip);
        formData.append("userBio", data.userBio);
        formData.append("country", data.country);
        formData.append("city", data.city);
        formData.append("state", data.state);
        formData.append("userId", userId);
        formData.append("logo", data.logo[0]);
        formData.append("coverPhoto", data.coverPhoto[0]);
         console.log("reva:",formData)
        const response = await axios.post(
          "/api/auth/user/profile-complete",
          formData
        );
        if (response.status === 200) {
          const { user } = response.data;
          // Cookies.set("accessToken", accessToken);
          // dispatch(loggedUserDetails(user));
          dispatch(signupUserDetails(user))
          toast.success("User Profile updated Successfully");
          navigate(`/payment/${user._id}`);
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
    <>
      <div>
        <a
          href="#"
          className="flex items-center mb-6 mt-4 text-2xl font-semibold text-gray-5 dark:text-white"
        >
          <img className="w-48 h-10 mr-8 ml-8" src="/hireLink.png" alt="logo" />
        </a>
      </div>
      <div className="px-24 py-12">
        <form onSubmit={handleSubmit(handleProfileComplete)}>
          <div className="space-y-12 px-24 py-12 border">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Hey {username}, Complete Your Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly, so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Company name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="companyName"
                      id="companyName"
                      autoComplete="organization"
                      {...register("companyName", {
                        required: "Company Name is required",
                        pattern: {
                          value:
                            /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                          message: "Name should only contain letters",
                        },
                      })}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.companyName && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.companyName.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="userBio"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="userBio"
                      name="userBio"
                      rows={3}
                      {...register("userBio", {
                        required: "Description is required",
                      })}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    ></textarea>
                    {errors.userBio && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.userBio.message}
                      </small>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about the company.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="logo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Logo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    { showCompanyImage ? (
                      <img
                        className="h-10 w-10 object-cover rounded-full"
                        src={showCompanyImage}
                        alt="Current photo"
                      />
                    ) : (
                      <img
                        className="h-10 w-10 object-cover rounded-full"
                        src="/images/logoplaceholder.png"
                        alt="Current Logo"
                      />
                    )}
                  </div>
                  <label className="block">
                    <span className="sr-only">Upload Picture</span>
                    <input
                      name="logo"
                      id="logo"
                      type="file"
                      onChange={handleCompanyLogoChange}
                      {...register("logo", {
                        required: "image is required",
                      })}
                     
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0 
                       file:text-sm file:font-semibold
                         file:bg-violet-50 file:text-blue-700
                          hover:file:bg-violet-100"
                    />
                  </label>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="coverPhoto"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Cover photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <label htmlFor="coverPhoto" className="cursor-pointer">
                        {showCoverImage ? (
                          <div className="h-full">
                            <img
                              className="h-full w-full"
                              id="selected-image"
                              src={showCoverImage}
                              alt="Selected Image"
                            />
                          </div>
                        ) : (
                          <img
                            className="h-10 w-10 object-cover rounded-full"
                            src="/images/logoplaceholder.png"
                            alt="Current Logo"
                          />
                        )}

                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <span>Upload Pic</span>
                        </div>

                        <input
                          type="file"
                          id="coverPhoto"
                          name="coverPhoto"
                          onChange={handleCoverPhotoChange}
                          className="hidden"
                          {...register("coverPhoto", {
                            required: "image is required",
                          })}
                          
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="registrationNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Registration Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="registrationNumber"
                      id="registrationNumber"
                      autoComplete="off"
                      {...register("registrationNumber")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.registrationNumber && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.registrationNumber.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="websiteUrl"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Website URL
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="websiteUrl"
                      id="websiteUrl"
                      autoComplete="off"
                      {...register("websiteUrl")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.websiteUrl && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.websiteUrl.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Contact Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="contactNumber"
                      id="contactNumber"
                      autoComplete="off"
                      {...register("contactNumber")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.contactNumber && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.contactNumber.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="country"
                      id="country"
                      autoComplete="off"
                      {...register("country")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.country && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.country.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="off"
                      {...register("address")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.address && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.address.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      {...register("city")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.city && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.city.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="state"
                      id="state"
                      autoComplete="address-level1"
                      {...register("state")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.state && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.state.message}
                      </small>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="zip"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="zip"
                      id="zip"
                      autoComplete="postal-code"
                      {...register("zip")}
                      className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring focus:ring-blue-700 focus:outline-none  sm:text-sm sm:leading-6"
                    />
                    {errors.zip && (
                      <small className="mt-2 text-red-500 text-sm">
                        {errors.zip.message}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to ="/login">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            </Link>
            <button
              type="submit"
              className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileComplete;
