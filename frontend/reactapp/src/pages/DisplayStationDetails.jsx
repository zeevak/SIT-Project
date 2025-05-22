import React, { useEffect, useState } from "react";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";
import StationAccountApi from "../apiservice/StationAccountApi";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-[300px]">
    <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
);

function DisplayStationDetails() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      console.log("Fetching data...");
      setTimeout(() => {
        setLoading(false);
      }, 10000);

      const response = await StationAccountApi.getStationDetails();
      console.log("API Response:", response);

      if (response) {
        setStationData(response.stationDto);
        setLoading(false);
      } else {
        setError("Invalid data structure received.");
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      setSuccess("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-800 h-screen fixed w-full">
        {error && <Error error={error} setError={setError} />}
        {success && <Success success={success} setSuccess={setSuccess} />}

        <div className="my-24">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="flex items-center justify-center">
              <div className="rounded-xl w-full max-w-4xl p-6 mt-24">
                <div className=" text-black p-6 rounded-xl mb-8">
                  <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                    Station Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <span className="font-bold text-blue-500">
                          Station ID:{" "}
                        </span>
                        <span className="text-white">
                          {stationData.stationId || "Not Found"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-bold text-blue-500">
                          Station Address:{" "}
                        </span>
                        <span className="text-white">
                          {stationData.stationAddress || "Not Found"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-bold text-blue-500">
                          Dealer Name:{" "}
                        </span>
                        <span className="text-white">
                          {stationData.dealerName || "Not Found"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-bold text-blue-500">
                          License Number:{" "}
                        </span>

                        <span className="text-white">
                          {stationData.licenseNumber || "Not Found"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-bold text-blue-500">
                          Login Code:{" "}
                        </span>
                        <span className="text-white">
                          {stationData.loginCode || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" text-black p-6 rounded-xl">
                  <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                    Fuel Availability
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p>
                        <span className="font-bold text-blue-500">
                          Available Petrol:{" "}
                        </span>
                        <span className="text-white">
                          {stationData.fuel?.availablePetrolQuantity || 0}{" "}
                          Liters
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-bold text-blue-500">
                          Available Diesel:{" "}
                        </span>
                        <span className="text-white">
                          {stationData.fuel?.availableDieselQuantity || 0}{" "}
                          Liters
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="flex justify-center mt-8">
                  {/* <img
                    src="src/Assets/stationHistory-removebg-preview.png"
                    alt="Station History"
                    className="rounded-lg max-w-full w-64"
                  /> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DisplayStationDetails;
