import { useState } from "react";
import StationAccountApi from "../apiservice/StationAccountApi";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";
import { Oval } from "react-loader-spinner";
import { motion } from "framer-motion";
import { SlideRight } from "../animation/direction";
import { SlideLeft } from "../animation/direction";
import { FaGasPump, FaIdCard, FaUserTie, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";

const StationRegistration = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    licenseNumber: "",
    stationId: "",
    dealerName: "",
    stationAddress: "",
  });

  const validateStation = () => {
    const { licenseNumber, stationId, dealerName, stationAddress } = formData;

    if (!stationId || !dealerName || !stationAddress || !licenseNumber) {
      setError("Please fill in all the required fields.");
      return false;
    }

    if (stationId.length < 6) {
      setError("Station ID must be at least 6 characters long.");
      return false;
    }

    if (licenseNumber.length < 8) {
      setError("License number must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStation()) {
      setTimeout(() => setError(""), 5000);
      return;
    }
    setLoading(true);

    try {
      const response = await StationAccountApi.registerStation(formData);

      console.log(response.data);
      if (response.statusCode === 200) {
        const id = response.stationDto.id;
        localStorage.setItem("stationId", id);
        setFormData({
          licenseNumber: "",
          stationId: "",
          dealerName: "",
          stationAddress: "",
        });

        setError("");
        setSuccess("Successfully registered! OTP will be sent shortly.");
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(response?.message || error.message);
        setTimeout(() => setError(""), 5000);
      }
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-black min-h-screen w-full fixed overflow-y-auto pt-8">
      {error && <Error error={error} setError={setError} />}
      {success && <Success success={success} setSuccess={setSuccess} />}
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <motion.div 
            variants={SlideRight(0.1)}
            initial="hidden"
            whileInView={"visible"}
            className="w-full max-w-md p-8 rounded-lg"
          >
            <div className="flex items-center justify-center mb-6">
              <FaGasPump className="text-4xl text-orange-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">
                Station Registration
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full">
                  <label
                    htmlFor="licenseNumber"
                    className="block text-sm font-medium text-neutral-300 mb-1 flex items-center"
                  >
                    <FaIdCard className="mr-2" /> Licence No
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="Enter Licence No"
                      className="bg-gray-200 p-2 pl-10 rounded-sm text-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MdDriveFileRenameOutline className="absolute left-3 top-3 text-gray-500" />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="stationId"
                    className="block text-sm font-medium text-neutral-300 mb-1 flex items-center"
                  >
                    <FaIdCard className="mr-2" /> Station ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="stationId"
                      value={formData.stationId}
                      onChange={handleChange}
                      placeholder="10XXXX"
                      className="bg-gray-200 p-2 pl-10 rounded-sm text-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaGasPump className="absolute left-3 top-3 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dealerName"
                  className="block text-sm font-medium text-neutral-300 flex items-center"
                >
                  <FaUserTie className="mr-2" /> Dealer Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="dealerName"
                    value={formData.dealerName}
                    onChange={handleChange}
                    placeholder="Enter Dealer's Name"
                    className="bg-gray-200 p-2 pl-10 rounded-sm text-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaUserTie className="absolute left-3 top-3 text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="stationAddress"
                  className="block text-sm font-medium text-neutral-300 flex items-center"
                >
                  <FaMapMarkerAlt className="mr-2" /> Station Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="stationAddress"
                    value={formData.stationAddress}
                    onChange={handleChange}
                    placeholder="Station Address"
                    className="bg-gray-200 p-2 pl-10 rounded-sm text-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-500" />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className={`bg-blue-600 w-full text-white p-3 rounded-sm flex items-center justify-center transition-all duration-300 ${
                    loading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-blue-700 hover:shadow-lg"
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
                    <>
                      <FaPaperPlane className="mr-2" /> 
                      Register Station
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-neutral-400">
              <p>Already registered? <a href="#" className="text-blue-400 hover:underline">Login here</a></p>
            </div>
          </motion.div>

          <motion.div
            variants={SlideLeft(0.1)}
            initial="hidden"
            whileInView={"visible"}
            className="w-full lg:w-1/2 pb-15 hidden lg:block"
          >
            <div className="relative">
              <img 
                src="../src/Assets/—Pngtree—gas station in public facilities_5456633.png" 
                alt="Gas Station" 
                className="w-full max-w-xl mx-auto rounded-sm  transform hover:scale-105 transition-transform duration-500"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-800 to-transparent p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-white">Join Our Network</h3>
                <p className="text-neutral-300 mt-2">
                  Register your gas station to become part of our growing network and enjoy seamless management.
                </p>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StationRegistration;