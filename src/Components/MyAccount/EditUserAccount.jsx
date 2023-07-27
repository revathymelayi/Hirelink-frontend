import axios from "../../Config/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserDetails } from "../redux-toolkit/slices/userSlice";
import { useForm } from "react-hook-form";

import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const EditUserAccount = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser.userInfo);
  const company = useSelector(
    (state) => state.loggedUser.userInfo.employerdetails
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      companyName: company.companyName,
      websiteUrl: company.websiteUrl,
      email: user.email,
      contactNumber: company.contactNumber,
      userBio: company.userBio,
      registrationNumber: company.registrationNumber,
      address: company.address,
      country: company.country,
      city: company.city,
      zip: company.zip,
      state: company.state,
      logo: company.logo,
      coverPhoto: company.coverPhoto,
    },
  });
  const {
    companyName,
    websiteUrl,
    registrationNumber,
    contactNumber,
    address,
    city,
    zip,
    state,
    logo,
    coverPhoto,
    email,
    userBio,
  } = watch([
    "companyName",
    "websiteUrl",
    "registrationNumber",
    "contactNumber",
    "address",
    "city",
    "zip",
    "state",
    "logo",
    "coverPhoto",
    "email",
    "userBio",
  ]);
  const [selectedCompanyLogo, setCompanyLogo] = useState("");
  const [showCompanyImage, setCompanyImage] = useState("");

  const [selectedCoverPic, setCoverPic] = useState("");
  const [showCoverImage, setCoverImage] = useState("");
  const handleCoverPhotoChange = (e) => {
    setCoverPic(e.target.files[0]);
    setCoverImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleCompanyLogoChange = (e) => {
    console.log(123456);
    console.log("handleCompanyLogoChange called");
    setCompanyLogo(e.target.files[0]);
    setCompanyImage(URL.createObjectURL(e.target.files[0]));
    console.log("Selected logo:", e.target.files[0]);
    console.log("Show company image:", showCompanyImage);
  };
  const onSubmit = async (data) => {
    try {
      if (data) {
        const formData = new FormData();
        // Append form fields to formData
        formData.append("companyName", data.companyName);
        formData.append("email", data.email);
        formData.append("contactNumber", data.contactNumber);
        formData.append("websiteUrl", data.websiteUrl);
        formData.append("userBio", data.userBio);
        formData.append("registrationNumber", data.registrationNumber);
        formData.append("address", data.address);
        formData.append("state", data.state);
        formData.append("city", data.city);
        formData.append("zip", data.zip);
        formData.append("country", data.country);
        formData.append("coverPhoto", selectedCoverPic);
        formData.append("logo", selectedCompanyLogo);
        console.log("dfgh:",formData);
        const response = await axios.post(
          `api/employer/edit-employer-details?userId=${user._id}`,
          formData
        );
        console.log("asdf:",response);
        if (response.status === 200) {
       
          dispatch(loggedUserDetails(response.data.user));
          toast.success("Employer details updated successfully");
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
    <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
      <div className="space-y-12 px-24 py-6 border ">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company Name
              </label>
              <div className="mt-2">
                <div className="flex px-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    {...register("companyName", {
                      required: "Company name is required",
                      pattern: {
                        value:
                          /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                        message: "Title should only contain letters",
                      },
                    })}
                    autoComplete="companyName"
                    className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.companyName && (
                    <small className="mt-2 text-red-500 text-sm">
                      {errors.companyName.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Bio
              </label>
              <div className="mt-2">
                <textarea
                  id="userBio"
                  name="userBio"
                  rows={3}
                  {...register("userBio", {
                    required: "Bio is required",
                  })}
                  className={`block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.userBio ? "border-red-500" : ""
                  }`}
                />
                {errors.userBio && (
                  <small className="mt-2 text-red-500 text-sm">
                    {errors.userBio.message}
                  </small>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about company.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>

              <div className="mt-2 flex items-center gap-x-3">
                {/* <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                /> */}
                {showCompanyImage ? (
                  <img
                    className="h-96 w-96 object-cover rounded-full"
                    src={showCompanyImage}
                    alt="Current logo "
                  />
                ) : company.logo === null ? (
                  <>
                    <h3 className="text-yellow-500 text-sm">Upload logo </h3>
                    <img
                      className="h-12 w-12 object-cover square-full"
                      // src="/images/user-plceholder.png"
                      alt={company.companyName}
                    />
                  </>
                ) : (
                  <img
                    className="h-12 w-12 object-cover square-full"
                    src={`http://localhost:8080/user/${company.logo}`}
                    alt={company.companyName}
                  />
                )}
                <div className="mt-2 ">
                  <input
                    className="block w-full text-sm h-12 text-gray-900 rounded-lg cursor-pointer custom-blue-shade1 dark:text-gray-400 focus:outline-none dark:bg-gray-700 placeholder-gray-500 placeholder-opacity-10"
                    id="file_input"
                    type="file"
                    {...register("logo", {
                      required: company?.logo ? false : "logo is required",
                    })}
                    onChange={handleCompanyLogoChange}
                  />
                  {errors.logo && (
                    <small className="mt-2 text-red-500 text-sm">
                      {errors.logo.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  {/* <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  /> */}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
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
                        <div className="h-full">
                          <img
                            className="h-full w-full"
                            id="selected-image"
                            src={`http://localhost:8080/user/${company.coverPhoto}`}
                            alt="Selected Image"
                          />
                        </div>
                      )}
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="coverPhoto"
                        type="file"
                        onChange={handleCoverPhotoChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="Registration Number"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Registration NUmber
              </label>
              <div className="mt-2">
                <input
                  type="registrationNumber"
                  name="registrationNumber"
                  id="registrationNumber"
                  {...register("registrationNumber", {
                    required: "Number is required",
                  })}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Website URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="websiteUrl"
                  id="websiteUrl"
                  {...register("websiteUrl", { required: "Url is required" })}
                  className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  id="contactNumber"
                  name="contactNumber"
                  type="contactNumber"
                  {...register("contactNumber", {
                    required: "Number is required",
                  })}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <div className="mt-2">
                <input
                  id="country"
                  name="country"
                  type="country"
                  {...register("country", { required: "country is required" })}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  id="address"
                  {...register("address", { required: "address is required" })}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                  {...register("city", { required: "city is required" })}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  {...register("state", { required: "state is required" })}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  {...register("zip", { required: "zip is required" })}
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditUserAccount;
