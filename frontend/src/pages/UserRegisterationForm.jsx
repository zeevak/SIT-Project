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
    <div className="bg-slate-800 h-screen w-full fixed ">
      <div className="container my-20">
        <div className="flex justify-between items-start">
        
          <div className="container text-sm mb-32 ">
            <div className=" w-[450px]">
              <motion.div
                variants={SlideLeft(0.2)}
                initial="hidden"
                whileInView="visible"
                className="w-1/2 flex flex-col mt-3"
              >
                {error && <Error error={error} setError={setError} />}
                {success && (
                  <Success success={success} setSuccess={setSuccess} />
                )}
                <form onSubmit={handleSubmit} className="w-[500px]">
                  <div className="m-5 w-[460px]">
                    <label className="block my-1 text-neutral-400">
                      Tel No
                    </label>
                    <input
                      type="text"
                      name="telno"
                      value={formData.telno}
                      onChange={handleChange}
                      placeholder="+94xxxxxxxx"
                      className="bg-gray-200 p-1 w-full"
                      disabled={otpSent}
                    />
                {/*    {!otpSent ? (
                      <button
                        type="button"
                        className="bg-blue-700 text-white px-6 py-1 mt-3"
                        onClick={handleSendOtp}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Oval
                            height={24}
                            width={24}
                            color="white"
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="white"
                            strokeWidth={3}
                            strokeWidthSecondary={3}
                          />
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    ) : (
                      <div className="mt-4">
                        <label className="block my-1 text-neutral-400 ">
                          Enter OTP
                        </label>
                        <div className="flex  items-center w-full ">
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="bg-gray-200 p-1 w-[50%] "
                          />
                          <button
                            type="button"
                            className="bg-blue-700 text-white px-6 py-1 w-[50%] "
                            onClick={handleVerifyOtp}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Oval
                                height={24}
                                width={24}
                                color="white"
                                visible={true}
                                ariaLabel="oval-loading"
                                secondaryColor="white"
                                strokeWidth={3}
                                strokeWidthSecondary={3}
                              />
                            ) : (
                              "Verify OTP"
                            )}
                          </button>
                        </div>
                      </div>
                    )}*/ }
                  </div>
                  {otpVerified && (
                    <>
                      <div className="grid grid-cols-2 m-5 ">
                        <div className="mr-3">
                          <label className="block   text-neutral-400">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="firstname"
                            className="bg-gray-200 p-1  w-full"
                          />
                        </div>
                        <div className="mr-3">
                          <label className="block  text-neutral-400">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="lastname"
                            className="bg-gray-200 p-1 w-[230px]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 m-5">
                        <div className="mr-3">
                          <label className="block  text-neutral-400">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="username"
                            className="bg-gray-200 p-1  w-full"
                          />
                        </div>
                        <div className="">
                          <label className="block  text-neutral-400">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="password"
                            className="bg-gray-200 p-1 w-full"
                          />
                        </div>
                      </div>
                      <div className="m-5">
                        <label className="block  text-neutral-400">
                          confirmed Password
                        </label>
                        <input
                          type="password"
                          name="confirmpassword"
                          value={formData.confirmpassword}
                          onChange={handleChange}
                          placeholder="password"
                          className="bg-gray-200 p-1 w-full"
                        />
                      </div>

                      <div className="m-5">
                        <label className="block my-1 text-neutral-400">
                          NIC
                        </label>
                        <input
                          type="text"
                          name="nic"
                          value={formData.nic}
                          onChange={handleChange}
                          placeholder="NIC number"
                          className="bg-gray-200 p-1 w-full"
                        />
                      </div>
                      <div className="m-5">
                        <label className="block text-neutral-400">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="bg-gray-200 p-1 w-full"
                        >
                          <option value="">Select Role</option>
                          <option value="FUELSTATION_OWNER">
                            Fuel Station Owner
                          </option>
                          <option value="VEHICLE_OWNER">Vehicle Owner</option>
                        </select>
                      </div>
                      {formData.role === "FUELSTATION_OWNER" && (
                        <div className="m-5">
                          <label className="block  text-neutral-400">
                            License Number
                          </label>
                          <input
                            type="text"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            placeholder="License number"
                            className="bg-gray-200 p-1 w-full"
                          />
                        </div>
                      )}
                      <div className="m-5">
                        <label className="flex items-center gap-2 text-neutral-400">
                          <input
                            type="checkbox"
                            onChange={handleCheckboxChange}
                            className="h-4 w-4"
                          />
                          <a href="/termsAndConditions">I accept the terms and conditions.</a>
                        </label>
                      </div>

                      <div className="m-5">
                        <button
                          type="submit"
                          className={`bg-blue-700 text-white px-6 py-1 w-full ${
                            !acceptedTerms
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={!acceptedTerms}
                        >
                          Create an account
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
          <div className="">
            <h1 className="text-3xl font-extrabold px-8 mt-14 text-white">
              Sign Up
            </h1>
            <div className="relative  ">
              <div className=" p-8 text-white">
                <div className="flex flex-col gap-3">
                  <motion.p
                    variants={SlideUp(0.2)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="flex items-center gap-2"
                  >
                    <img
                      src="../src/Assets/accept.png"
                      alt=""
                      className="w-[15px] h-[15px] inline"
                    />
                    <span>First Name</span>
                  </motion.p>
                  <motion.p
                    variants={SlideUp(0.4)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="flex items-center gap-2"
                  >
                    <img
                      src="../src/Assets/accept.png"
                      alt=""
                      className="w-[15px] h-[15px] inline"
                    />
                    <span>Last Name</span>
                  </motion.p>
                  <motion.p
                    variants={SlideUp(0.3)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="flex items-start gap-2"
                  >
                    <img
                      src="../src/Assets/accept.png"
                      alt=""
                      className="w-[15px] h-[15px] inline"
                    />
                    <span>NIC</span>

                    <span className="text-xs text-neutral-400 ">
                      Enter your National Identity Card number. This helps us
                      verify your identity and ensure that your registration is
                      valid. This is typically a government-issued
                      numberExample:
                      <span className="text-white">
                        "123456789456V / 200023002913"
                      </span>{" "}
                    </span>
                  </motion.p>
                  <motion.p
                    variants={SlideUp(0.4)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="flex items-start gap-2"
                  >
                    <img
                      src="../src/Assets/accept.png"
                      alt=""
                      className="w-[15px] h-[15px] inline"
                    />
                    <span>Tel No</span>

                    <span className="text-xs text-neutral-400 ">
                      Enter your telephone number. Please ensure that it is
                      active and that we can reach you if necessary. Use the
                      format +94xxxxxxxx (Sri Lanka)
                      <span className="text-white">
                        <br />
                        Example:"+94123456789"
                      </span>{" "}
                    </span>
                  </motion.p>
                  <motion.p
                    variants={SlideUp(0.5)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="flex items-start gap-2"
                  >
                    <img
                      src="../src/Assets/accept.png"
                      alt=""
                      className="w-[15px] h-[15px] inline"
                    />
                    <span>Username</span>
                    <span className="text-xs text-neutral-400">
                      Choose a unique username. This will be used to identify
                      your account. It should be something you’ll remember and
                      may include letters, numbers, and underscores. <br />
                      <span className="text-white">Example:name@gmail.com</span>
                    </span>
                  </motion.p>
                  <motion.p
                    variants={SlideUp(0.6)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="flex items-start gap-2"
                  >
                    <img
                      src="../src/Assets/accept.png"
                      alt=""
                      className="w-[15px] h-[15px] inline"
                    />
                    <span>Password</span>
                    <span className="text-xs text-neutral-400">
                      Create a strong password that you can easily remember but
                      is difficult for others to guess. We recommend using a
                      combination of letters, numbers, and special characters..{" "}
                      <br />
                      <span className="text-white">
                        Example:xxxxxx atlease 5 characters
                      </span>
                    </span>
                  </motion.p>
                  <motion.p
                    variants={SlideUp(0.7)}
                    initial="hidden"
                    whileInView={"visible"}
                    className="flex items-start gap-2"
                  >
                    <img
                      src="../src/Assets/accept.png"
                      alt=""
                      className="w-[15px] h-[15px] inline"
                    />
                    <span>Role</span>
                    <span className="text-xs text-neutral-400">
                      When you select fuel station owner you need to provide one
                      more secure license No for you station registration <br />
                      <span className="text-white">
                        Example:xxxxxx secure license code for fuel station
                      </span>
                    </span>
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterationForm;
