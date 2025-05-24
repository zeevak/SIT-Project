import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Authentication from "../apiservice/Authentication";
import { SlideDown } from "../animation/direction";
import { motion } from "framer-motion";
import UserAccountApi from "../apiservice/UserAccountApi";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = Authentication.isAuthenticated();
  console.log(isAuthenticated);
  const isFuelStationOwner = Authentication.isFuelStationOwner();
  const isVehicleOwner = Authentication.isVehicleOwner();
  const isAdmin = Authentication.isAdmin();
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  const getUser = async () => {
    try {
      const response = await UserAccountApi.getUserDetails();

      setUserData(response.userAccountDto);
      console.log(response.userAccountDto);

      console.log(userData);

      setError("");
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setSuccess("");
    }
  };

  const handleLogout = () => {
    Authentication.logout();
    navigate("/");
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const formatUsername = () => {
    if (isAdmin) {
      return "Admin";
    } else if (isVehicleOwner && userData) {
      return `${userData.firstname.charAt(0)}${userData.lastname}`;
    } else if (isFuelStationOwner && userData) {
      return userData.licenseNumber;
    }
    return "";
  };

  return (
    <>
      <motion.div
        variants={SlideDown(0.2)}
        initial="hidden"
        whileInView={"visible"}
        className=" absolute top-0 z-50 w-full"
      >
        <div className="flex flex-wrap justify-between items-center text-white font-bold px-4 py-6 md:px-10 lg:px-36">
          <div>
            <h1 className="text-xl sm:text-2xl">
              <img
                src="src/Assets/Monochrome Ilustration Graffiti Logo new.png"
                alt=""
                className="w-[125px]"
              />
            </h1>
          </div>

          <div className="hidden md:flex">
            <ul className="flex justify-between items-center space-x-4 sm:space-x-6 lg:space-x-10 text-sm">
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="/service">Service</NavLink>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              
              {isVehicleOwner && (
                <li className="hover:text-gray-300 cursor-pointer">
                  <NavLink to="/users">User Dashdashboard</NavLink>
                </li>
              )}
              {/* {isFuelStationOwner && (
                <li className="hover:text-gray-300 cursor-pointer">
                  <NavLink to="/stationRegister">FuelStationRegister</NavLink>
                </li>
              )} */}
              {isFuelStationOwner && (
                <li className="hover:text-gray-300 cursor-pointer">
                  <NavLink to="/stationOwner">Station Dashboard</NavLink>
                </li>
              )}
              {/* {isAdmin && (
                <li className="hover:text-gray-300 cursor-pointer">
                  <NavLink to="/admin">AdminPanel</NavLink>
                </li>
              )} */}
            </ul>
          </div>
          {!isAuthenticated && (
            <div className="flex gap-3">
              <div className="hidden md:block">
                <button className="primary-btn ">
                  <NavLink to="/login">Sign in</NavLink>
                </button>
              </div>
              <div className="hidden md:block">
                <button className="primary-btn">
                  <NavLink to="/register">Sign up</NavLink>{" "}
                </button>
              </div>
            </div>
          )}
          {isAuthenticated && userData && (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={toggleDropdown}
              >
                <img
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${
                    userData?.firstname || "defaultUser"
                  }`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />

                <span>{formatUsername()}</span>
              </div>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-blue-900 text-white rounded-md shadow-lg "
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-white hover:text-black"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm  hover:bg-white hover:text-black"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="md:hidden">
            <button className="text-white"></button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
