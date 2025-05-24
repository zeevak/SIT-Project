import React, { useEffect, useState } from "react";
import Admin from "../apiservice/Admin";

const UpdateStation = () => {
  const [stationDetails, setStationDetails] = useState([]);
  const [error, setError] = useState(null);
  const [editingStation, setEditingStation] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await Admin.getRegisterdStations();
        if (response.statusCode === 200) {
          setStationDetails(response.stationDtosList);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
      }
    };

    fetchStations();
  }, []);

  const handleUpdate = (station) => {
    setEditingStation(station.id);
    setUpdatedName(station.dealerName);
    setUpdatedAddress(station.stationAddress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation check
    if (!updatedName || !updatedAddress) {
      setFormError("Both fields are required.");
      return;
    }

    try {
      const updatedStationData = {
        dealerName: updatedName,
        stationAddress: updatedAddress,
      };

      const response = await Admin.updateStations(
        editingStation,
        updatedStationData
      );

      if (response.statusCode === 200) {
        
        setStationDetails((prev) =>
          prev.map((station) =>
            station.id === editingStation
              ? {
                  ...station,
                  dealerName: updatedName,
                  stationAddress: updatedAddress,
                }
              : station
          )
        );
        setEditingStation(null);
      } else {
        setFormError("Failed to update station.");
      }
    } catch (err) {
      console.log(err);
      setFormError("Error updating station.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Update Station</h1>

      {editingStation ? (
        <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center">
          <div className="p-4 bg-slate-800 rounded-lg w-[90%] max-w-lg text-neutral-400">
            <h2 className="text-xl text-white mb-7">Edit Station</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white">Station Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-700 text-white"
                />
              </div>
              <div>
                <label className="text-white">Station Address</label>
                <input
                  type="text"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-700 text-white"
                />
              </div>
              {formError && <p className="text-red-500">{formError}</p>}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="px-2 py-2 bg-blue-700 rounded-lg text-white"
                >
                  Submit Update
                </button>
                <button
                  onClick={() => setEditingStation(null)}
                  className=" px-4 py-2 bg-red-600 rounded-lg text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-white">
            <thead className="text-left">
              <tr>
                <th className="text-orange-500 px-4 py-2">ID</th>
                <th className="text-orange-500 px-4 py-2">DealerId</th>
                <th className="text-orange-500 px-4 py-2">DealerName</th>
                <th className="text-orange-500 px-4 py-2">Address</th>
                <th className="text-orange-500 px-4 py-2">LicenseNumber</th>
                <th className="text-orange-500 px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {stationDetails.length > 0 ? (
                stationDetails.map((station) => (
                  <tr
                    key={station.id}
                    className="border-b border-neutral-500 text-sm"
                  >
                    <td className="px-4 py-6 text-neutral-400">{station.id}</td>
                    <td className="px-4 py-2 text-neutral-400">
                      {station.stationId}
                    </td>
                    <td className="px-4 py-2 text-neutral-400">
                      {station.dealerName}
                    </td>
                    <td className="px-4 py-2 text-neutral-400">
                      {station.stationAddress}
                    </td>
                    <td className="px-4 py-2 text-neutral-400">
                      {station.licenseNumber}
                    </td>
                    <td>
                      <button
                        onClick={() => handleUpdate(station)}
                        className="px-4 py-2 w-[150px] rounded-lg bg-green-500"
                      >
                        UPDATE
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-white">
                    No stations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpdateStation;
