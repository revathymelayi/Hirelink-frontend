import axios from "../../../Config/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserDetails } from "../../redux-toolkit/slices/userSlice";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/solid";

export default function ProfileComplete() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const user = useSelector((state) => state.loggedUser.userInfo);
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      qualification: "",
      resume: "",
      contactNumber: "",
      salary: "",
      experience: "",
      address: "",
    },
  });
  const { qualification, resume, contactNumber, salary, experience, address } =
    watch([
      "qualification",
      "resume",
      "contactNumber",
      "salary",
      "experience",
      "address",
    ]);
  const [selectedResume, setResume] = useState("");
  const [showResumeFile, setResumeFile] = useState("");
  const handleResumeFileChange = (e) => {
    setResume(e.target.files[0]);
    setResumeFile(URL.createObjectURL(e.target.files[0]));
  };
  

  const handleProfileComplete = async (data) => {
    try {
      if (data) {
        const formData = new FormData();
        // Append form fields to formData
        formData.append("qualification", data.qualification);
        formData.append("contactNumber", data.contactNumber);
        formData.append("salary", data.salary);
        formData.append("experience", data.experience);
        formData.append("address", data.address);
        formData.append("resume", data.resume[0]);
        formData.append("userId", user._id);

        const response = await axios.post(
          "/api/user/profile-complete",
          formData
        );
        if (response.status === 200) {
          const { user } = response.data;
          dispatch(loggedUserDetails(response.data.user));
          toast.success("user details updated successfully");
          navigate("/employers");
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
    <form onSubmit={handleSubmit(handleProfileComplete)} enctype="multipart/form-data">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload Resume
              </label>

              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="resume" 
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload your resume</span>
                      <input
                        id="resume"
                        name="resume"
                        type="file"
                        className="sr-only"
                        onChange={handleResumeFileChange} 
                        {...register("resume", {
                          required: "file is required",
                        })}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PDF files up to 10MB
                  </p>
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
            <div className="sm:col-span-4">
              <label
                htmlFor="qualification"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Educational Qualification
              </label>
              <div className="mt-2">
                <input
                  id="qualification"
                  name="qualification"
                  type="qualification"
                  autoComplete="qualification"
                  {...register("qualification", {
                    required: "Qualification is required",
                    pattern: {
                      value:
                        /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                      message: "it should only contain letters",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.qualoification && (
                  <small className="mt-2 text-red-500 text-sm">
                    {errors.qualification.message}
                  </small>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="Salary"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Salary Expectation
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  autoComplete="salary"
                  {...register("salary")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.salary && (
                  <small className="mt-2 text-red-500 text-sm">
                    {errors.salary.message}
                  </small>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Experience
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  autoComplete="experience"
                  {...register("experience")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.experience && (
                  <small className="mt-2 text-red-500 text-sm">
                    {errors.experience.message}
                  </small>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contact Number
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="contactNumber"
                  id="contactNumber"
                  autoComplete="contactNumber"
                  {...register("contactNumber")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autoComplete="street-address"
                  {...register("address")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.address && (
                  <small className="mt-2 text-red-500 text-sm">
                    {errors.address.message}
                  </small>
                )}
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
}
