import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Fuel,
  Loader,
  CalendarDays,
  Layers3,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";

const VehicleTransaction = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");

  const fetchData = async () => {
    try {
      setLoading(true);
      const vehicleId = localStorage.getItem("vehicleId");

      const vehicleRes = await axios.get(
        `http://localhost:8080/api/vehicle/${vehicleId}`   
      );
      const vehicleData = vehicleRes.data.vehicleDto;
      setVehicleDetails(vehicleData);

      const response = await axios.get(
        `http://localhost:8080/api/fuelAllocation/vehicle/${vehicleId}/transitions`
      );
      const transactions = response.data.fuelTransitionDtoList || [];
      setData(transactions);
      setFilteredData(transactions);
      setError("");
    } catch (err) {
      console.error("Error fetching vehicle transactions:", err);
      setError("Failed to fetch data for this vehicle.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...data];

    if (fuelTypeFilter !== "All") {
      result = result.filter((t) => t.fuelType === fuelTypeFilter);
    }

    result.sort((a, b) =>
      sortOrder === "Newest"
        ? new Date(b.transitionTime) - new Date(a.transitionTime)
        : new Date(a.transitionTime) - new Date(b.transitionTime)
    );

    setFilteredData(result);
  }, [fuelTypeFilter, sortOrder, data]);

  const totalFuel = filteredData.reduce(
    (sum, item) => sum + (item.fuelAmount || 0),
    0
  );
  const lastTransaction = filteredData.length
    ? new Date(
        Math.max(...filteredData.map((t) => new Date(t.transitionTime).getTime()))
      ).toLocaleString()
    : "N/A";

  return (
    <div className="container pl-40 pt-24 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-white"
      >
        Vehicle Transactions
      </motion.h1>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mb-4"
        >
          {error}
        </motion.p>
      )}

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center"
      >
        <div className="flex items-center gap-2">
          <Filter className="text-orange-500" />
          <span className="font-medium">Filter by:</span>
        </div>
        <select
          value={fuelTypeFilter}
          onChange={(e) => setFuelTypeFilter(e.target.value)}
          className="bg-gray-900 text-white border border-gray-700 px-5 py-2 rounded-lg "
        >
          <option value="All">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-gray-900 text-white border border-gray-700 px-5 py-2 rounded-lg"
        >
          <option value="Newest">Newest First</option>
          <option value="Oldest">Oldest First</option>
        </select>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Layers3 className="text-orange-400" size={32} />
          <div>
            <h2 className="text-xl font-semibold">Total Transactions</h2>
            <p className="text-lg">{filteredData.length}</p>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Fuel className="text-yellow-400" size={32} />
          <div>
            <h2 className="text-xl font-semibold">Total Fuel Used</h2>
            <p className="text-lg">{totalFuel.toFixed(2)} Litres</p>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-2xl shadow-md flex items-center gap-4">
          <CalendarDays className="text-blue-400" size={32} />
          <div>
            <h2 className="text-xl font-semibold">Last Transaction</h2>
            <p className="text-lg">{lastTransaction}</p>
          </div>
        </div>
      </motion.div>
      
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-orange-400"
        >
          <Loader className="animate-spin " /> Loading transactions...
        </motion.div>
      )}

      {!loading && filteredData.length === 0 && !error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400"
        >
          No transactions found for this filter.
        </motion.p>
      )}

      {!loading && filteredData.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="overflow-x-auto"
        >
          <table className="table-auto w-full text-sm">
            <thead className="text-orange-400 bg-gray-900">
              <tr className="text-left">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Fuel Type</th>
                <th className="px-4 py-2">Fuel Amount</th>
                <th className="px-4 py-2">Transition Time</th>
                <th className="px-4 py-2">Station</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="px-4 py-7">{item.id}</td>
                  <td className="px-4 py-3">{item.fuelType}</td>
                  <td className="px-4 py-3">
                    {item.fuelAmount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-4 py-3">
                    {item.transitionTime
                      ? new Date(item.transitionTime).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {item.station?.stationName || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default VehicleTransaction;
