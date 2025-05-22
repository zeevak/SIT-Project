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
      <div className="bg-slate-800 h-screen w-full fixed ">
        {error && <Error error={error} setError={setError} />}
        {success && <Success success={success} setSuccess={setSuccess} />}
        <div className=" container flex w-full text-sm  mt-44 text-white ">
          <motion.div
            variants={SlideRight(0.1)}
            initial="hidden"
            whileInView={"visible"}
            className="w-full flex flex-col space-y-8  p-6 rounded-lg "
          >
            <h1 className="text-4xl font-semibold">
              Vehicle Registration 
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-5">
                <div>
                  <label className="block my-1 text-neutral-400">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    name="license_plate_no"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    placeholder="Enter vehicle number"
                    className="bg-gray-600 p-1 rounded-sm text-md w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block my-1 text-neutral-400">
                    Chassis Number
                  </label>
                  <input
                    type="text"
                    name="vehicleRegNo"
                    value={formData.vehicleRegNo}
                    onChange={handleChange}
                    placeholder="Enter chassis number"
                    className="bg-gray-600 p-1 rounded-sm text-md w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5  my-7 ">
                <div>
                  <label className="block my-1 text-neutral-400">
                    Vehicle Type
                  </label>
                  <select
                    name="vehicle_type"
                    value={formData.vehicle_type}
                    onChange={handleChange}
                    className="bg-gray-600 p-1 rounded-sm text-md w-[386px]"
                    required
                  >
                    {/* <option value="">Select vehicle type</option>
                    <option value="Car">Car</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option> */}
                    <option value="">Select Vehicle Type</option>
                    {vehicleType.map((type, index) => (
                      <option key={type.vehicleTypeId} value={type.vehicleType}>
                        {type.vehicleType}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block my-1 text-neutral-400">
                    Fuel Type
                  </label>
                  <select
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleChange}
                    className="bg-gray-600 p-1 rounded-sm text-md w-[386px]"
                    required
                  >
                    <option value="">Select fuel type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>

              <br />

              <button
                type="submit"
                className={`bg-blue-800 p-2 w-[386px] text-white flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                )}
                {loading ? "Processing..." : "Register Vehicle"}
              </button>
            </form>
          </motion.div>
        </div>
        <motion.div
          //  variants={SlideLeft(0.1)}
          //                  initial="hidden"
          //                  whileInView={"visible"}

          className="h-[300PX] w-[600px] bg-gray-900 ml-96 transform -translate-y-56 translate-x-96 rounded-lg"
        >
          {instruction && (
            <div className="">
              <div className="py-3 px-9">
                <h1 className="text-xl text-white my-1">Vehicle Number</h1>
                <p className="text-xs text-neutral-400 my-2">
                  The vehicle number is a unique identifier assigned to your
                  vehicle. It is usually displayed on the license plate and is
                  required for legal and identification purposes. Please enter
                  the complete registration number without spaces or special
                  characters
                </p>
                <p className="text-neutral-200 text-xs my-1">
                  Example: "ABC1234, DL5C4567"
                </p>
              </div>
              <div className="py-3 px-9">
                <h1 className="text-xl text-white my-1">Chassis Number</h1>
                <p className="text-xs text-neutral-400 my-2">
                  {" "}
                  The chassis number (also known as the VIN or Vehicle
                  Identification Number) is a unique 17-character code that
                  identifies your vehicle. It can be found on the chassis or
                  frame of your vehicle and may be listed in your vehicle's
                  documentation (e.g., registration papers). This number is
                  crucial for tracking and verifying the vehicle's history
                </p>
                <p className="text-neutral-200 text-xs my-1">
                  Example: "1HGBH41JXMN109186"
                </p>
              </div>
            </div>
          )}
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
        </motion.div>
      </div>
    </>
  );
};

export default VehicleRegistration;
