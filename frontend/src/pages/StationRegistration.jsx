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
    <div className="bg-gray-900 min-h-screen w-full">
      {/* Space for navbar */}
      <div className="h-20"></div> {/* Adjust this height to match your navbar */}
      
      {/* Form container with increased top padding */}
      <div className="flex items-center justify-center p-4 pt-12"> {/* Added pt-12 for more space */}
        {error && <Error error={error} setError={setError} />}
        {success && <Success success={success} setSuccess={setSuccess} />}
        
        <div className="w-full max-w-md">
          <motion.div 
            variants={SlideRight(0.1)}
            initial="hidden"
            whileInView="visible"
            className="bg-gray-800 p-8 rounded-lg shadow-xl"
          >
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-3">
                <FaGasPump className="text-3xl text-orange-500 mr-2" />
                <h2 className="text-2xl font-bold text-white">
                  Station Registration
                </h2>
              </div>
              <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* License No and Station ID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    <span className="flex items-center">
                      <FaIdCard className="mr-2" /> Licence No
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      placeholder="Enter Licence No"
                      className="bg-gray-700 text-white p-2 pl-9 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <MdDriveFileRenameOutline className="absolute left-2.5 top-2.5 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1">
                    <span className="flex items-center">
                      <FaGasPump className="mr-2" /> Station ID
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="stationId"
                      value={formData.stationId}
                      onChange={handleChange}
                      placeholder="10XXXX"
                      className="bg-gray-700 text-white p-2 pl-9 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <FaIdCard className="absolute left-2.5 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Dealer Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  <span className="flex items-center">
                    <FaUserTie className="mr-2" /> Dealer Name
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="dealerName"
                    value={formData.dealerName}
                    onChange={handleChange}
                    placeholder="Enter Dealer's Name"
                    className="bg-gray-700 text-white p-2 pl-9 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaUserTie className="absolute left-2.5 top-2.5 text-gray-400" />
                </div>
              </div>

              {/* Station Address */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" /> Station Address
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="stationAddress"
                    value={formData.stationAddress}
                    onChange={handleChange}
                    placeholder="Station Address"
                    className="bg-gray-700 text-white p-2 pl-9 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaMapMarkerAlt className="absolute left-2.5 top-2.5 text-gray-400" />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className={`bg-blue-600 w-full text-white p-2.5 rounded flex items-center justify-center transition ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <Oval
                      height={20}
                      width={20}
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

            {/* Login Link */}
            <div className="mt-5 text-center text-xs text-neutral-400">
              <p>Already registered? <a href="#" className="text-blue-400 hover:underline">Login here</a></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StationRegistration;