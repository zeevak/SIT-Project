import React, { useEffect, useState } from "react";
import Admin from "../apiservice/Admin";

const ViewStations = () => {
  const [stationDetails, setStationDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await Admin.getStations(); // Replace with your API endpoint
        if (response.statusCode === 200) {
          setStationDetails(response.stationWithStatusDTOList);
          setFilteredDetails(response.stationWithStatusDTOList);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStations();
  }, []);

   
  useEffect(() => {
    let filtered = stationDetails;

    if (searchTerm) {
      filtered = filtered.filter((station) =>
        station.dealerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((station) => station.status === statusFilter);
    }

    setFilteredDetails(filtered);
  }, [searchTerm, statusFilter, stationDetails]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Station Dashboard</h1>

 
      <div className="mb-4 flex flex-wrap gap-4 ">
        <input
          type="text"
          placeholder="Search by Dealer Name"
          className="flex-1 px-4 py-2 border-2 border-slate-800 bg-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="flex-1 px-4 py-2 border-2 border-slate-800 bg-slate-800 text-gray-400"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="" className="">All Status</option>
          <option value="Registered">Registered</option>
          <option value="Not Registered">Not Registered</option>
        </select>
      </div>

  
      {error && <p className="text-red-500">Error: {error}</p>}

    
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-white">
          <thead className="text-left">
            <tr>
              <th className="text-orange-500 px-4 py-2">ID</th>
              <th className="text-orange-500 px-4 py-2">DealerId</th>
              <th className="text-orange-500 px-4 py-2">DealerName</th>
              <th className="text-orange-500 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDetails.map((station, index) => (
              <tr key={index} className="border-b border-neutral-500 text-sm">
                <td className="px-4 py-6 text-neutral-400">{station.id}</td>
                <td className="px-4 py-2 text-neutral-400">{station.dealerId}</td>
                <td className="px-4 py-2 text-neutral-400">{station.dealerName}</td>
                <td>
                  <button
                    className={`px-4 py-2 w-[150px] rounded-lg ${
                      station.status === "Registered"
                        ? "bg-green-600"
                        : station.status === "Not Registered"
                        ? "bg-red-600"
                        : ""
                    }`}
                  >
                    {station.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredDetails.length === 0 && (
          <p className="text-neutral-400 mt-4">No stations found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewStations;
