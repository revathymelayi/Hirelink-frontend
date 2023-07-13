import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "../../../Config/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const EditJob= ()=>{
    const job = useSelector((state) => state.jobDetails.jobInfo)
    
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    useEffect(() => {
        axios
          .get("api/admin/categories")
          .then((response) => {
            const list = response.data.categories;
            setCategories(list);
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error(error.response.data.message);
            } else {
              toast.error("An error occurred. Please try again later");
            }
          });
        axios
          .get("api/admin/job-types")
          .then((response) => {
            const list = response.data.jobtypes;
            setTypes(list);
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error(error.response.data.message);
            } else {
              toast.error("An error occurred. Please try again later");
            }
          });
      }, []);
      const navigate = useNavigate();
      
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      jobTitle:job.jobTitle,
      companyName:job.companyName,
      description:job.description,
      experience: job.experience,
      location:job.location,
      salary: job.salary,
      jobtype: job.jobtype,
      category: job.category,
      skills:job.skills,
      logoImage: job.logoImage,
    },
  });
  const {
    jobTitle,
    companyName,
    description,
    experience,
    location,
    salary,
    jobtype,
    category,
    skills,
    logoImage,
  } = watch([
    "jobTitle",
    "companyName",
    "description",
    "experience",
    "location",
    "salary",
    "jobtype",
    "category",
    "skills",
    "logoImage",
  ]);
  const [selectedCompanyLogo, setCompanyLogo] = useState("");
  const [showLogo, setLogo] = useState("");

  const [imageSize, setImageSize] = useState(0);

  const handleCompanyLogoChange = (e) => {
    setCompanyLogo(e.target.files[0]);
    setLogo(URL.createObjectURL(e.target.files[0]));
   
  };
  const user = useSelector((state) => state.loggedUser.userInfo);
  const onSubmit = async (data) => {
    try {
     
      if (data) {
        const formData = new FormData();
        // Append form fields to formData

        formData.append("jobTitle", data.jobTitle);
        formData.append("companyName",data.companyName);
        formData.append("description", data.description);
        formData.append("experience", data.experience);
        formData.append("location", data.location);
        formData.append("salary", data.salary);
        formData.append("skills",data.skills);
        formData.append("jobtype", data.jobtype);
        formData.append("category", data.category);
        formData.append("logoImage", data.logoImage[0]);

        const response = await axios.post(
          `api/employer/add-job?employerId=${user._id}`,
          formData
        );
        // if (response.status === 200) {
        //   toast.success("job added successfully");
        //   navigate("/employer/job-posts");
        // }
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
    <div className="flex flex-grow   items-center justify-center   mb-32 ">
      <form
        style={{
          background: "linear-gradient(to left,#094dff,#1d5bff,#098bff)",
        }}
        className="grid  rounded-lg shadow-xl w-11/12 md:w-11/12 lg:w-1/2 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-center">
          <div className="flex mt-4">
            <h3 className="text-white font-bold md:text-2xl text-xl">
              Edit Job
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
            Company Name
          </label>
          <input
            className="py-2 px-3 rounded-lg  mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent"
            type="text"
            id="companyName"
            name="companyName"
            
            {...register("companyName", {
              required: "Company name is required",
              pattern: {
                value:
                  /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                message: "Name should only contain letters",
              },
            })}
           
          />
          {errors.companyName && (
            <small className="mt-2 text-white text-sm">
              {errors.companyName.message}
            </small>
          )}
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
            Job Title
          </label>
          <input
            className="py-2 px-3 rounded-lg  mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent"
            type="text"
            id="jobtitle"
            name="jobtitle"
            
            {...register("jobTitle", {
              required: "Job Title is required",
              pattern: {
                value:
                  /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                message: "Title should only contain letters",
              },
            })}
           
          />
          {errors.jobTitle && (
            <small className="mt-2 text-white text-sm">
              {errors.jobTitle.message}
            </small>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
          <div className="grid grid-cols-1">
            <label className="md:text-sm text-xs text-gray-900 text-light font-semibold">
              Salary
            </label>
            <input
              className="py-2 px-3 rounded-lg mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent"
              type="text"
              id="salary"
              name="salary"
              {...register("salary", {
                required: "Salary is required",
                pattern: {
                  value: /^[0-9a-zA-Z]+$/,
                  message: "Salary should only contain numbers",
                },
              })}
            />
            {errors.salary && (
              <small className="mt-2 text-white text-sm">
                {errors.salary.message}
              </small>
            )}
          </div>

          <div className="grid grid-cols-1">
            <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
              Experience Required
            </label>
            <input
              className="py-2 px-3 rounded-lg   mt-1  focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent"
              type="text"
              id="experience"
              name="experience"
              {...register("experience", {
                required: "experience is required",
                pattern: {
                  value: /^[0-9a-zA-Z]+$/,
                  message: "experience should only contain numbers",
                },
              })}
            />
            {errors.experience && (
              <small className="mt-2 text-white text-sm">
                {errors.experience.message}
              </small>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7 ">
          <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
            Select Industry
          </label>
          <select
            id="category"
            name="category"
            autoComplete="category-name"
            {...register("category", {
              required: "Category is required",
            })}
            className={`py-2 px-3 rounded-lg  md:text-sm text-sm mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent ${
              errors.category ? "border-white" : ""
            }`}
            defaultValue={ job?.category }
          >
            
            {categories.map((category, i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <small className="mt-2 text-white text-sm">
              {errors.category.message}
            </small>
          )}
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
            Select Type
          </label>
          <select
            id="jobtype"
            name="jobtype"
            autoComplete="job-type"
            {...register("jobtype", {
              required: "job-type is required",
            })}
            className={`py-2 px-3 rounded-lg  md:text-sm text-xs  mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent ${
              errors.jobtype ? "border-white" : ""
            }`}
            defaultValue={ job?.jobtype }
          >
            
            {types.map((type, i) => (
              <option key={i} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.jobtype && (
            <small className="mt-2 text-white text-sm">
              {errors.jobtype.message}
            </small>
          )}
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
            Job Location
          </label>
          <input
            className="py-2 px-3 rounded-lg  mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent"
            type="text"
            id="location"
            name="location"
            {...register("location", {
              required: "location is required",
              pattern: {
                value:
                  /^(?=.*\S)[A-Za-z\s\d!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/i,
                message: "location should only contain letters",
              },
            })}
          />
          {errors.location && (
            <small className="mt-2 text-white text-sm">
              {errors.location.message}
            </small>
          )}
        </div>
        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
            Skills Required
          </label>
          <textarea
            id="skills"
            name="skills"
            rows={4}
            defaultValue={""}
            {...register("skills", {
              required: "Description is required",
            })}
            className={`py-2 px-3  rounded-lg  mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent ${
              errors.description ? "border-white" : ""
            }`}
          />
          {errors.description && (
            <small className="mt-2 text-white text-sm">
              {errors.description.message}
            </small>
          )}
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7">
          <label className=" md:text-sm text-xs text-gray-900 text-light font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={""}
            {...register("description", {
              required: "Description is required",
            })}
            className={`py-2 px-3  rounded-lg  mt-1 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-transparent ${
              errors.description ? "border-white" : ""
            }`}
          />
          {errors.description && (
            <small className="mt-2 text-white text-sm">
              {errors.description.message}
            </small>
          )}
        </div>

        <div className="grid grid-cols-1 mt-5 mx-7 rounded-full">
          <label className="md:text-sm text-xs text-gray-900 text-light font-semibold mb-1">
             Company Logo
          </label>
          <div className="flex items-center justify-center rounded-full">
            <label className="flex flex-col border-4 border-dashed ">
             
              {showLogo ? (
                <img
                  className="h-20 w-20 rounded-full"
                  src={ showLogo}
                  alt="Uploaded logo"
                />
              ) : (
                <img
                className="h-20 w-20  rounded-full"
                src={ `http://localhost:8080/user/${ job?.logoImage }` }
                alt="Uploaded logo"
                />
              )}
              

              <input
                className="hidden"
                id="file_input"
                type="file"
                name="logoImage"
                onChange={handleCompanyLogoChange}
                
                {...register("logoImage", {
                  required: "Image is required",
                 
                })}
              />
            </label>
          </div>
          {errors.logoImage ? (
            <small className="mt-2 text-white text-sm">
              {errors.logoImage.type === "required"
                ? errors.logoImage.message
                : `Image size: ${imageSize}KB. ${errors.logoImage.message}`}
            </small>
          ) : (
            ""
          )}
        </div>

        <div className="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
          <button
            type="button"
            className="w-auto bg-gray-700 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ backgroundColor: "#c2033a" }}
            className="w-auto  hover:bg-blue-800 rounded-lg shadow-xl font-medium text-white px-4 py-2"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditJob;