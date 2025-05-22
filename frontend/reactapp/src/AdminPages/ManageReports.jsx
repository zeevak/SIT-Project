import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = {
  getStationReports: async () => {
    return axios.get("http://localhost:8080/api/fuelAllocation/alltransitions");
  },
};

const FuelAllocationTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [stationId, setStationId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await Admin.getStationReports();

      if (response.status === 200 && response.data?.fuelTransitionDtoList) {
        setData(response.data.fuelTransitionDtoList);
        setFilteredData(response.data.fuelTransitionDtoList);
      } else {
        throw new Error("Invalid response format");
      }
      setError("");
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Fetch data error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = data;

    if (stationId.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.stationId.toString().toLowerCase().includes(stationId.trim().toLowerCase())
      );
    }

    if (startDate) {
      const startTimestamp = new Date(startDate).getTime();
      filtered = filtered.filter(
        (item) => new Date(item.transitionTime).getTime() >= startTimestamp
      );
    }

    if (endDate) {
      const endTimestamp = new Date(endDate).getTime();
      filtered = filtered.filter(
        (item) => new Date(item.transitionTime).getTime() <= endTimestamp
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [stationId, startDate, endDate]);

  return (
    <div className="container mx-auto p-5 text-white">
      <h1 className="text-2xl font-bold mb-4">Fuel Allocations</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Enter Station ID"
          value={stationId}
          onChange={(e) => setStationId(e.target.value)}
          className="p-2 border border-gray-500 bg-gray-800 text-white rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-500 bg-gray-800 text-white rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-500 bg-gray-800 text-white rounded"
        />
      </div>

      {loading && <p className="text-orange-500">Loading data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && filteredData.length === 0 && !error && (
        <p className="text-gray-400">No records found.</p>
      )}

      {!loading && filteredData.length > 0 && (
        <table className="table-auto w-full">
          <thead className="text-orange-500">
            <tr className="text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Station ID</th>
              <th className="px-4 py-2">Fuel Type</th>
              <th className="px-4 py-2">Fuel Amount</th>
              <th className="px-4 py-2">Transition Time</th>
              <th className="px-4 py-2">Vehicle ID</th>
              <th className="px-4 py-2">User ID</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} className="border-b border-neutral-500">
                <td className="px-4 py-6">{item.id}</td>
                <td className="px-4 py-2">{item.stationId}</td>
                <td className="px-4 py-2">{item.fuelType}</td>
                <td className="px-4 py-2">{item.fuelAmount?.toFixed(2) || "0.00"}</td>
                <td className="px-4 py-2">
                  {item.transitionTime
                    ? new Date(item.transitionTime).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2">
                  {item.vehicleVerification?.license_plate_no || "N/A"}
                </td>
                <td className="px-4 py-2">
                  {item.userAccount?.username || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FuelAllocationTable;
