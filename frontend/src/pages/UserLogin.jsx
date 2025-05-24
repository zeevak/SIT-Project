import React, { useState } from "react";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import { NavLink, useNavigate } from "react-router-dom";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";
import UserAccountApi from "../apiservice/UserAccountApi";
import { Oval } from "react-loader-spinner";
import { FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideLeft } from "../animation/direction";
import { SlideRight } from "../animation/direction";

function UserLogin() {
  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpBar, setOtpBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const validate = async () => {
    
    if (username && password) {
      return true;
    }
    return false;
  };

  const handleLogin = async () => {
    if (!validate()) {
      console.log("check")
      setError("Fill the input fields");
      return;
    }
    setLoading(true);
    try {
      const response = await UserAccountApi.loginUser({ username, password });
      if (response.statusCode === 200) {
        const id = response.userAccountDto.userId;
        const role = response.userAccountDto.role;
        console.log(role)
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
        }else if (role === "ADMIN"){
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

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFaTimes = () => setOtpBar(false);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
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

  return (
    <>
      <div>
        <div className="bg-slate-800 h-screen fixed w-full">
          {error && <Error error={error} setError={setError} />}
          {success && <Success success={success} setSuccess={setSuccess} />}

          <div className="container text-sm my-44">
            <div className="flex items-center w-full">
              <div className="w-1/2 mr-24 mb-20">
                <motion.img
                  variants={SlideRight(0.1)}
                  initial="hidden"
                  whileInView={"visible"}
                  src="src/Assets/log.png"
                  alt=""
                  className=""
                />
              </div>
              <motion.div
                variants={SlideLeft(0.1)}
                initial="hidden"
                whileInView={"visible"}
                className="w-1/2 flex flex-col gap-5"
              >
                <div>
                  <h1 className="text-4xl font-extrabold text-white">Sign in</h1>
                  <p className="my-3 text-neutral-400">
                    Don't have an account{" "}
                    <span className="text-blue-700 hover:underline hover:cursor-pointer">
                      <a href="/register">Register here</a>
                    </span>
                  </p>
                </div>

                <div>
                  <div className="my-1 text-neutral-400">
                    <label htmlFor="email">Username</label>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="name@gmail.com"
                      onChange={handleUsernameChange}
                      className="bg-gray-200 p-1 rounded-sm text-md w-full"
                    />
                    <div className="absolute right-2 top-2">
                      <img
                        src={email_icon}
                        alt=""
                        className="w-3 h-3"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="my-1 text-neutral-400">
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Your password"
                      onChange={handlePasswordChange}
                      className="bg-gray-200 p-1 rounded-sm text-md w-full"
                    />
                    <div className="absolute right-2 top-2">
                      {/* <img
                        src={password_icon}
                        alt=""
                        className="w-3 h-3"
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <input type="checkbox" />
                    <label htmlFor="remember" className="text-neutral-400">
                      Remember me
                    </label>
                  </div>
                  <div className="text-blue-700 hover:underline hover:cursor-pointer">
                    <a href="/forgotpassword">Forgot Password?</a>
                  </div>
                </div>
                <div className="w-full">
                  <button
                    className={`bg-blue-800 w-full text-white p-2 flex items-center justify-center ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-600"
                    }`}
                    disabled={loading}
                    onClick={handleLogin}
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
                </div>
                <div className="flex items-center">
                  <div className="w-1/2 h-[1px] bg-gray-300"></div>
                  <p className="mx-5 text-neutral-500">or</p>
                  <div className="w-1/2 h-[1px] bg-gray-300"></div>
                </div>
                <div className="flex justify-center items-center space-x-5">
                  <img
                    src="../src/Assets/google-icon-251x256-2pod32cq.png"
                    alt=""
                    className="w-7 h-7"
                  />
                  <img
                    src="../src/Assets/facebook-color-icon-512x512-y7c9r37n.png"
                    alt=""
                    className="w-7 h-7"
                  />
                  <img
                    src="../src/Assets/apple-icon-430x512-tmf55ggw.png"
                    alt=""
                    className="w-8 h-8 mb-2"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        {otpBar && (
          <div className="block fixed z-1 left-0 top-0 w-full h-full bg-black bg-opacity-80">
            <div className="bg-white container rounded-2xl py-10 max-w-[500px] my-40">
              <FaTimes
                className="absolute top-5 right-5 cursor-pointer"
                size={20}
                onClick={handleFaTimes}
              />
              <h1 className="text-2xl font-medium text-center">
                Verify your email
              </h1>
              <div className="flex justify-center my-10">
                <img
                  src="../src/Assets/726623.png"
                  alt=""
                  className="w-[100px] h-[100px]"
                />
              </div>
              <p className="text-center mb-5">
                Enter the 6-digit verification code that was sent to your email
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center space-y-4"
              >
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
                  <a href="" className="text-blue-800 hover:underline">
                    Request again
                  </a>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserLogin;
