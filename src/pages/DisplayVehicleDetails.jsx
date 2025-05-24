import React, { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import VehicleApi from "../apiservice/VehicleApi";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { SlideUp, SlideDown } from "../animation/direction";

const DisplayVehicleDetails = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [qrVehicleData, setQrVehicleData] = useState([]);
  const qrRefs = useRef([]);

  // Dynamically create refs for each QR code
  useEffect(() => {
    qrRefs.current = qrVehicleData.map((_, i) => qrRefs.current[i] || React.createRef());
  }, [qrVehicleData]);

  useEffect(() => {
    getAllQr();
  }, []);

  const getAllQr = async () => {
    try {
      const response = await VehicleApi.getVehicleDetails();
      if (response?.vehiclesDtoList && Array.isArray(response.vehiclesDtoList)) {
        setQrVehicleData(response.vehiclesDtoList);
        setError("");
        console.log("QR Vehicle Data:", response.vehiclesDtoList);
      } else {
        setError("No vehicle data found.");
        setQrVehicleData([]);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setQrVehicleData([]);
    }
  };

  const downloadQR = (index) => {
    const currentRef = qrRefs.current[index];
    if (currentRef?.current) {
      toPng(currentRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `vehicle-${qrVehicleData[index].license_plate_no}-qr-code.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error("Error generating image:", err);
        });
    }
  };

  return (
    <div className="bg-slate-800 w-full min-h-screen fixed">
      
      {error && <Error error={error} setError={setError} />}
      {success && <Success success={success} setSuccess={setSuccess} />}
      

      <div
        className="h-screen overflow-y-auto"
        style={{
          scrollBehavior: "smooth", // Enables smooth scrolling
        }}
      >
        <h1 className="ml-64 mt-24 text-2xl text-white uppercase font-semibold"><span className="text-orange-500">Vehicle</span> <span className="text-blue-600">Qr</span></h1>
        
        {qrVehicleData.length > 0 ? (
          <div className="container ">
            {qrVehicleData.map((vehicle, index) => (
              <motion.div
                key={index}
                variants={SlideUp((index + 1) * 0.1)}
                initial="hidden"
                whileInView="visible"
                className="text-sm rounded-xl my-5"
              >
                
                <div className="flex justify-center h-[300px] text-white">
                  {/* QR Code Section */}
                  <div className="w-1/4 p-7 flex justify-center items-center">
                    <div
                      ref={qrRefs.current[index]}
                      style={{
                        display: "inline-block",
                        padding: "8px 18px",
                        border: "1px solid #ccc",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "black",
                          padding: "",
                          
                        }}
                      >
                        {vehicle.license_plate_no}
                      </div>
                      <QRCodeSVG value={vehicle.qrCode} size={130}  />
                      <div className="flex items-center justify-center">
                        <p className="text-black">Code:</p>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "black",
                          textAlign: "center",
                          
                        }}
                      >
                        {vehicle.qrCode}
                      </div>
                      </div>
                    
                    </div>
                  </div>

                  {/* Vehicle Details Section */}
                  <div className="w-3/4 p-20">
                    <div className="grid grid-cols-2 p-2">
                      <div>
                        <span className="text-orange-400">Vehicle Number:</span>
                        <span>{vehicle.license_plate_no}</span>
                      </div>
                      <div>
                        <span className="text-orange-400">Chassis Number:</span>
                        <span>{vehicle.vehicleRegNo}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                      <div>
                        <span className="text-orange-400">Vehicle Type:</span>
                        <span>{vehicle.vehicle_type}</span>
                      </div>
                      <div>
                        <span className="text-orange-400">Fuel Type:</span>
                        <span>{vehicle.fuel_type}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 p-2">
                      <div>
                        <span className="text-orange-400">
                          Maximum Fuel Capacity:
                        </span>
                        <span>{vehicle.maximumFuelCapacity}</span>
                      </div>
                      <div>
                        <span className="text-orange-400">
                          Available Fuel Capacity:
                        </span>
                        <span>{vehicle.availableFuelCapacity}</span>
                      </div>
                    </div>
                    <button
                      className="bg-green-600 w-[200px] py-1 mt-5"
                      onClick={() => downloadQR(index)}
                    >
                      Download QR
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={SlideDown(0.5)}
            initial="hidden"
            whileInView="visible"
            className="text-center w-full mt-24 flex justify-center items-center"
          >
            <div>
              <img
                src="..\src\Assets\nodata-Photoroom.png"
                alt="No data"
                className="mx-auto mt-10 w-[300px]"
              />
              <p className="text-neutral-500 text-3xl">Vehicle Not Registered</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DisplayVehicleDetails;
