import React from "react";
import axios from "../../Config/axios";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PENDING_EMPLOYER } from "../../utils/roles";
import { useForm } from "react-hook-form";

function SignupEmailVerification({ email, user }) {
  console.log(user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });
  const validateOtp = async (data) => {
    try {
      const response = await axios.post(
        `api/auth/user/validate-otp?userId=${user._id}`,
        data
      );
      if (response && response.status === 200) {
        toast.success("User Registered Successfully");
        if (user.role === PENDING_EMPLOYER) {
          navigate(`/profile-complete/${user.firstName}/${user._id}`);
        } else {
          navigate("/login");
        }
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
    <>
      <div className="absolute top-0 left-0 mt-2 ml-6">
        <img className="w-36" src="/hireLink.png" alt="logo" />
      </div>

      <div className="bg-white h-screen flex items-center justify-center p-12 py-6">
        <div className="mx-auto w-full max-w-screen-lg bg-blue-700 px-5 py-10">
          <div className="grid gap-5 md:grid-cols-2 md:gap-10 lg:gap-20">
            <div className="flex justify-center md:justify-end">
              <img
                className="w-full max-w-sm"
                src="https://ouch-cdn2.icons8.com/sKnF2PmYhkmP28DzIm6KqWSknT03UVWjg3FLlGYIOp4/rs:fit:684:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTI3/L2U4OWQ2NmZiLTg0/NzEtNDc3NS1hNTA0/LTMwNWRiYmJkNzg0/MC5zdmc.png"
                alt="Marketing newsletter via computer Illustration in PNG, SVG"
              />
            </div>
            <div className="flex items-center">
              <div className="mx-auto md:mx-0">
                <h3 className="text-2xl font-bold text-white">
                  Email Verification
                </h3>
                <p className="mt-2 max-w-[20rem] text-md text-white/80">
                  We've sent a verification code to your email-{email}
                </p>
                <form
                  onSubmit={handleSubmit(validateOtp)}
                  className="mt-4 flex flex-col"
                >
                  <div>
                    <input
                      type="otp"
                      name="otp"
                      id="otp"
                      placeholder="Enter the OTP"
                      {...register("otp", {
                        required: "OTP is required",
                      })}
                      className={`w-full rounded border border-white/50 bg-transparent px-3 py-2 text-white placeholder:text-white/50 md:max-w-[18rem] ${ errors.otp ? "border-red-500" : ""
                      }`}
                    />
                     { errors.otp && (
                        <small className="mt-2 text-red-500 text-sm">
                            { errors.otp.message }
                        </small>
                    ) }
                  </div>
                  <button
                    type="submit"
                    className="mt-4 w-full max-w-[14rem] rounded bg-white/30 px-14 py-2 text-center text-white"
                  >
                    VERIFY
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupEmailVerification;
