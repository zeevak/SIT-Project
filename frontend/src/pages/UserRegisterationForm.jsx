import React, { useState } from "react";
import UserAccountApi from "../apiservice/UserAccountApi";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";
import { motion } from "framer-motion";
import { SlideUp } from "../animation/direction";
import { SlideLeft } from "../animation/direction";
import { Oval } from "react-loader-spinner";

const UserRegisterationForm = () => {
  const [license, setLicense] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(true);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
    nic: "",
    telno: "",
    role: "",
    licenseNumber: "",
  });

  const validateForm = () => {
    const {
      firstname,
      lastname,
      username,
      password,
      confirmpassword,
      nic,
      telno,
      role,
      licenseNumber,
    } = formData;
    if (
      firstname &&
      lastname &&
      username &&
      password &&
      nic &&
      // telno &&
      role &&
      confirmpassword
    ) {
      if (role === "FUELSTATION_OWNER") {
        return !!licenseNumber;
      }
      return true;
    }
    return false;
  };

  const passwordChecker = () => {
    const {
      firstname,
      lastname,
      username,
      password,
      confirmpassword,
      nic,
      telno,
      role,
      licenseNumber,
    } = formData;
    if (password == confirmpassword) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setError("");
    console.log(formData)
    const { name, value } = e.target;
    if (name === "role") {
      setLicense(value === "FUELSTATION_OWNER");
    }
    setFormData({ ...formData, [name]: value });
  };
  const handleLicense = () => {
    setLicense(true);
  };

  const handleSendOtp = async () => {
    if (!formData.telno) {
      setError("Please enter your phone number.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await UserAccountApi.sendOtpPhoneNumber(formData.telno);
      if (response.statusCode === 200) {
        setOtpSent(true);
        setError("");
        setSuccess("OTP sent successfully.");
      }
    } catch (error) {
      setError("The phone number not verified" || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await UserAccountApi.verifyOtpNumber({
        telno: formData.telno,
        otp,
      });
      if (response.statusCode === 200) {
        setOtpVerified(true);
        setError("");
        setSuccess("OTP verified successfully.");
      }
    } catch (error) {
      setError(error.response?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordChecker()) {
      setError("Please fill in same password in confirm password fields.");
      return;
    }

    if (!validateForm()) {
      setError("Please fill in all the required fields.");
      return;
    }

    try {
      const response = await UserAccountApi.registerUser(formData);
      console.log(response);
      if (response.statusCode === 200) {
        setFormData({
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          confirmpassword: "",
          nic: "",
          telno: "",
          role: "",
          licenseNumber: "",
        });
        setLicense(false);
        setError("");
        setSuccess("User Account Registration successful!");
      }
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen w-full pt-32 pb-10"> {/* Increased pt-32 for more navbar space */}
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <motion.div
              variants={SlideLeft(0.2)}
              initial="hidden"
              whileInView="visible"
              className="flex flex-col"
            >
            

              {error && <Error error={error} setError={setError} />}
              {success && <Success success={success} setSuccess={setSuccess} />}

              <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
                  {/* Single-line centered title */}
              <h1 className="text-3xl font-bold text-white text-center mb-8">
                User Registration
              </h1>
                <div className="mb-4">
                  <label className="block text-neutral-300 mb-2">Tel No</label>
                  <input
                    type="text"
                    name="telno"
                    value={formData.telno}
                    onChange={handleChange}
                    placeholder="+94xxxxxxxx"
                    className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    disabled={otpSent}
                  />
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-neutral-300 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      placeholder="firstname"
                      className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="lastname"
                      className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Username and Password */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-neutral-300 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="username"
                      className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-300 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="password"
                      className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block text-neutral-300 mb-2">Confirmed Password</label>
                  <input
                    type="password"
                    name="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    placeholder="password"
                    className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Rest of the form fields */}
                <div className="mb-4">
                  <label className="block text-neutral-300 mb-2">NIC</label>
                  <input
                    type="text"
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    placeholder="NIC number"
                    className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-neutral-300 mb-2">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Role</option>
                    <option value="FUELSTATION_OWNER">Fuel Station Owner</option>
                    <option value="VEHICLE_OWNER">Vehicle Owner</option>
                  </select>
                </div>

                {formData.role === "FUELSTATION_OWNER" && (
                  <div className="mb-4">
                    <label className="block text-neutral-300 mb-2">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="License number"
                      className="bg-gray-700 text-white p-2 w-full rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <label className="flex items-center gap-2 text-neutral-300">
                    <input
                      type="checkbox"
                      onChange={handleCheckboxChange}
                      className="h-4 w-4"
                    />
                    <a href="/termsAndConditions" className="text-blue-400 hover:underline">
                      I accept the terms and conditions.
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full transition ${
                    !acceptedTerms ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!acceptedTerms}
                >
                  Create an account
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterationForm;
