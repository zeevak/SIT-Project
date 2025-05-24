import React, { useEffect, useState } from "react";
import Admin from "../apiservice/Admin";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"; // Install lucide-react for icons

const ViewStations = () => {
  const [stationDetails, setStationDetails] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [registrationDate, setRegistrationDate] = useState(""); // New state for date filtering
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await Admin.getRegisterdStations();
        if (response.statusCode === 200) {
          console.log(response.stationDtosList);
          setStationDetails(response.stationDtosList);
          setFilteredStations(response.stationDtosList); // Initialize filtered data
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStations();
  }, []);

  // Handle filtering
  useEffect(() => {
    let filteredData = [...stationDetails];

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter((station) =>
        station.stationId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "All") {
      const isActiveFilter = statusFilter === "Active";
      filteredData = filteredData.filter((station) => {
        const isActive =
          station.fuel &&
          (station.fuel.availableDieselQuantity > 0 ||
            station.fuel.availablePetrolQuantity > 0);
        return isActive === isActiveFilter;
      });
    }

    // Filter by registration date
    if (registrationDate) {
      filteredData = filteredData.filter(
        (station) => station.registrationDate === registrationDate
      );
    }

    setFilteredStations(filteredData);
  }, [searchTerm, statusFilter, registrationDate, stationDetails]);

  const handleUpdate = (index) => {
    navigate("/admin/updateSelectedStationFuel", {
      state: { station: filteredStations[index] },
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Station Dashboard</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* Search bar with icon */}
        <div className="flex items-center text-sm rounded w-full max-w-sm bg-slate-800">
          <Search className="ml-2 text-gray-500 w-[18px]" />
          <input
            type="text"
            placeholder="Search by Station ID (e.g., DE001)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border-2 border-slate-800 bg-slate-800"    
          />
        </div>

        {/* Dropdown for status */}
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-3 text-gray-400  rounded bg-slate-800 w-full max-w-xs"
          >
            <option value="All">RegisteredStations</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Date filter */}
        <div>
          <input
            type="date"
            value={registrationDate}
            onChange={(e) => setRegistrationDate(e.target.value)}
            className="px-4 py-2 text-gray-400 rounded bg-slate-800 w-full max-w-xs cursor-pointer"
          />
        </div>
      </div>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-white">
            <thead className="text-left">
              <tr>
                <th className="text-orange-500 px-4 py-2">ID</th>
                <th className="text-orange-500 px-4 py-2">Diesel Available</th>
                <th className="text-orange-500 px-4 py-2">Petrol Available</th>
                <th className="text-orange-500 px-4 py-2">Registration Date</th>
                <th className="text-orange-500 px-4 py-2">Station Address</th>
                <th className="text-orange-500 px-4 py-2">Station ID</th>
                <th className="text-orange-500 px-4 py-2">Status</th>
                <th className="text-orange-500 px-4 py-2">Allocate Fuel</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.map((station, index) => {
                const isActive =
                  station.fuel &&
                  (station.fuel.availableDieselQuantity > 0 ||
                    station.fuel.availablePetrolQuantity > 0);
                const status = isActive ? "Active" : "Inactive";

                return (
                  <tr
                    key={index}
                    className={`border-b border-neutral-500 text-sm ${
                      isActive ? "" : "bg-slate-700"
                    }`}
                  >
                    <td className="px-4 py-2 text-neutral-400">{station.id}</td>
                    <td className="px-4 py-2 text-neutral-400">
                      {station.fuel
                        ? station.fuel.availableDieselQuantity
                        : "N/A"}
                    </td>
                    <td className="px-4 py-6 text-neutral-400">
                      {station.fuel
                        ? station.fuel.availablePetrolQuantity
                        : "N/A"}
                    </td>
                    <td className="px-4 py-6 text-neutral-400">
                      {station.registrationDate}
                    </td>
                    <td className="px-4 py-6 text-neutral-400">
                      {station.stationAddress}
                    </td>
                    <td className="px-4 py-6 text-neutral-400">
                      {station.stationId}
                    </td>
                    <td className="px-4 py-6 text-neutral-400">{status}</td>
                    <td>
                      <button
                        className="px-4 py-2 rounded bg-green-600 text-white"
                        onClick={() => handleUpdate(index)}
                      >
                        Update Fuel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewStations;
