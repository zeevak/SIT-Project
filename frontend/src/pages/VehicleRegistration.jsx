import { useState, useRef, useEffect } from "react";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";
import VehicleApi from "../apiservice/VehicleApi";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { SlideRight } from "../animation/direction";
import { SlideUp } from "../animation/direction";

const VehicleRegistration = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [instruction, setInstruction] = useState(true);
  const [qrData, setQrData] = useState();
  const [loading, setLoading] = useState(false);
  const [vehicleType, setVehicleTypes] = useState([]);
  const [fuelAmount, setFuelAmount] = useState();

  const qrRef = useRef(null);

  const [formData, setFormData] = useState({
    license_plate_no: "",
    vehicle_type: "",
    vehicleRegNo: "",
    fuel_type: "",
  });

  const downloadQR = () => {
    if (qrRef.current) {
      toPng(qrRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "vehicle-qr-code.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Error generating image:", err);
        });
    }
  };

  const validateForm = () => {
    const { license_plate_no, vehicle_type, vehicleRegNo, fuel_type } =
      formData;
    if (license_plate_no && vehicle_type && vehicleRegNo && fuel_type) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError("fill the all fields");
      return;
    }
    setLoading(true);
    try {
      const response2 = await VehicleApi.findVehicle(formData.vehicle_type);
      if (response2.statusCode === 200) {
        const fuelCapacity = response2.vehicleDtoList[0].fuelCapacity;

        setFuelAmount(fuelCapacity);
      }
      const response = await VehicleApi.registerVehicle(formData, fuelAmount);
      if (response.statusCode === 200) {
        setSuccess("Vehicle registration successful");
        setInstruction(false);
        setQrData(response.vehiclesDto);
        setFormData({
          license_plate_no: "",
          vehicle_type: "",
          vehicleRegNo: "",
          fuel_type: "",
        });
        setError("");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError(response?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, success]);

  useEffect(() => {
    const getVehicleTypes = async () => {
      try {
        const response = await VehicleApi.getVehicleTypes();
        if (response.statusCode === 200) {
          setVehicleTypes(response.vehicleDtoList);
          console.log(response.vehicleDtoList);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(response?.message || "An unexpected error occurred");
      }
    };
    getVehicleTypes();
  }, []);

  return (
    <>
       <div className="bg-gray-900 min-h-screen w-full flex items-center justify-center pt-32 pb-10 " >
      <div className="w-full max-w-6xl">
        {error && <Error error={error} setError={setError} />}
        {success && <Success success={success} setSuccess={setSuccess} />}

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Registration Form - Centered */}
          <motion.div
            variants={SlideRight(0.1)}
            initial="hidden"
            whileInView={"visible"}
            className="w-full lg:w-1/2 max-w-2xl"
          >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
              <h1 className="text-3xl font-bold mb-6 text-white text-center">
                Vehicle Registration
              </h1>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      name="license_plate_no"
                      value={formData.license_plate_no}
                      onChange={handleChange}
                      placeholder="Enter vehicle number"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Chassis Number
                    </label>
                    <input
                      type="text"
                      name="vehicleRegNo"
                      value={formData.vehicleRegNo}
                      onChange={handleChange}
                      placeholder="Enter chassis number"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Vehicle Type
                    </label>
                    <select
                      name="vehicle_type"
                      value={formData.vehicle_type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Vehicle Type</option>
                      {vehicleType.map((type) => (
                        <option key={type.vehicleTypeId} value={type.vehicleType}>
                          {type.vehicleType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Fuel Type
                    </label>
                    <select
                      name="fuel_type"
                      value={formData.fuel_type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select fuel type</option>
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className={`w-full px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-md transition duration-200 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V12H4z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      "Register Vehicle"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        
         
          {qrData && (
            <motion.div
              variants={SlideUp(0.1)}
              initial="hidden"
              whileInView={"visible"}
              className="grid grid-cols-2"
            >
              <div className="text-white text-sm px-3 py-4 ">
                <h1 className="text-xl font-bold  ">Vehcile Details</h1>
                <table className="mt-3">
                  <tbody>
                    <tr className="">
                      <td className="">Vehicle Number</td>
                      <td className="text-right pl-20 py-1 text-neutral-400 ">
                        {qrData.license_plate_no}
                      </td>
                    </tr>
                    <tr>
                      <td>Chassis Number</td>
                      <td className="text-right py-1  text-neutral-400">
                        {qrData.vehicleRegNo}
                      </td>
                    </tr>
                    <tr>
                      <td>Vehicle Type</td>
                      <td className="text-right py-1  text-neutral-400">
                        {qrData.vehicle_type}
                      </td>
                    </tr>
                    <tr>
                      <td>Fuel Type</td>
                      <td className="text-right py-1  text-neutral-400">
                        {qrData.fuel_type}
                      </td>
                    </tr>
                    <tr>
                      <td>Available Fuel</td>
                      <td className="text-right py-1  text-neutral-400">
                        {qrData.availableFuelCapacity}
                      </td>
                    </tr>
                    <tr>
                      <td>Maximum Fuel</td>
                      <td className="text-right py-1  text-neutral-400">
                        {qrData.maximumFuelCapacity}
                      </td>
                    </tr>
                    <tr>
                      <td>QR Code</td>
                      <td className="text-right py-1  text-neutral-400">
                        {qrData.qrCode}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center my-3">
                  <button
                    className="bg-green-600 w-full py-1"
                    onClick={downloadQR}
                  >
                    Download
                  </button>
                </div>
              </div>
              <div className="  flex flex-col items-center justify-center mb-8 ">
                <div
                  ref={qrRef}
                  style={{
                    display: "inline-block",
                    padding: "10px 35px",
                    border: "1px solid #ccc",
                    // borderRadius: "10px",
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "",
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {qrData.license_plate_no}
                  </div>
                  <QRCodeSVG value={qrData.qrCode} size={230} />
                  <div
                    style={{
                      marginTop: "",
                      fontSize: "16px",
                      color: "#555",
                      textAlign: "center",
                    }}
                  >
                    {qrData.qrCode}
                  </div>
                </div>
              </div>
              
            </motion.div>
          )}
        </div>
    </div>
    </div>
    </>
  );
};

export default VehicleRegistration;
