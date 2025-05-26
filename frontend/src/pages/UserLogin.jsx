import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideLeft } from "../animation/direction";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";
import UserAccountApi from "../apiservice/UserAccountApi";
import { Oval } from "react-loader-spinner";
import email_icon from "../Assets/email.png";

function UserLogin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpBar, setOtpBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.username || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await UserAccountApi.loginUser({
        username: formData.username,
        password: formData.password
      });
      
      if (response.statusCode === 200) {
        const id = response.userAccountDto.userId;
        const role = response.userAccountDto.role;
        setId(id);
        setRole(role);
        setToken(response.token);

        if (role === "VEHICLE_OWNER") {
          setSuccess("User has successfully logged in");
          localStorage.setItem("userId", id);
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", role);
          navigate("/");
        } else if (role === "FUELSTATION_OWNER") {
          localStorage.setItem("userId", id);
          setOtpBar(true);
          setSuccess("OTP sent to your email. Please verify.");
        } else if (role === "ADMIN") {
          setSuccess("User has successfully logged in");
          localStorage.setItem("userId", id);
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", role);
          navigate("/admin");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const result = await UserAccountApi.verifySigningOtp(otpValue, userId);
      if (result.statusCode === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        navigate("/");
      } else {
        setError("OTP verification failed. Please try again.");
      }
    } catch (error) {
      setError("There was an error verifying the OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
     <div className="bg-black min-h-screen w-full pt-0.5 pb-0.5"> 
      {error && <Error error={error} setError={setError} />}
      {success && <Success success={success} setSuccess={setSuccess} />}

      <div className="container text-sm my-44">
        <div className="flex items-center w-full">
          <motion.div
            variants={SlideLeft(0.1)}
            initial="hidden"
            whileInView={"visible"}
            className="w-full max-w-md mx-auto flex flex-col gap-5"
          >
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
              <div>
                <h1 className="text-4xl font-extrabold text-white">Sign in</h1>
                <p className="my-3 text-neutral-400">
                  Don't have an account{" "}
                  <a href="/register" className="text-blue-700 hover:underline">
                    Register here
                  </a>
                </p>
              </div>

              <div className="mb-4">
                <label htmlFor="username" className="my-1 text-neutral-400 block">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="name@gmail.com"
                    value={formData.username}
                    onChange={handleChange}
                    className="bg-gray-200 p-2 rounded-sm text-md w-full"
                    required
                  />
                  <div className="absolute right-2 top-3">
                    <img src={email_icon} alt="" className="w-3 h-3" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="my-1 text-neutral-400 block">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-gray-200 p-2 rounded-sm text-md w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="rememberMe" className="text-neutral-400">
                    Remember me
                  </label>
                </div>
                <a href="/forgotpassword" className="text-blue-700 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className={`bg-blue-800 w-full text-white p-2 flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? (
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
                  "Sign In"
                )}
              </button>
            

            <div className="flex items-center">
              <div className="w-1/2 h-[1px] bg-gray-300"></div>
              <p className="mx-5 text-neutral-500">or</p>
              <div className="w-1/2 h-[1px] bg-gray-300"></div>
            </div>
            
            <div className="flex justify-center items-center space-x-5">
              <img
                src="../src/Assets/google-icon-251x256-2pod32cq.png"
                alt="Google"
                className="w-7 h-7 cursor-pointer"
              />
              <img
                src="../src/Assets/facebook-color-icon-512x512-y7c9r37n.png"
                alt="Facebook"
                className="w-7 h-7 cursor-pointer"
              />
              <img
                src="../src/Assets/apple-icon-430x512-tmf55ggw.png"
                alt="Apple"
                className="w-8 h-8 mb-2 cursor-pointer"
              />
            </div>
            </form>
          </motion.div>
        </div>
      </div>
      

      {/* OTP Verification Modal */}
      {otpBar && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-white rounded-2xl py-10 px-6 max-w-md w-full">
            <FaTimes
              className="absolute top-5 right-5 cursor-pointer"
              size={20}
              onClick={() => setOtpBar(false)}
            />
            <h1 className="text-2xl font-medium text-center">
              Verify your email
            </h1>
            <div className="flex justify-center my-10">
              <img
                src="../src/Assets/726623.png"
                alt="Verification"
                className="w-[100px] h-[100px]"
              />
            </div>
            <p className="text-center mb-5">
              Enter the 6-digit verification code that was sent to your email
            </p>
            <form onSubmit={handleOtpSubmit} className="flex flex-col items-center space-y-4">
              <div className="flex space-x-2">
                {otp.map((_, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(e, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-12 h-12 text-center text-2xl border bg-neutral-300 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <p className="text-xs">
                Didn't receive code?
                <a href="#" className="text-blue-800 hover:underline ml-1">
                  Request again
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLogin;
