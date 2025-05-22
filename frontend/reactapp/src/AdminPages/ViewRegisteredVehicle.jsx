import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "../apiservice/Admin";

const ViewRegisteredVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchCategory, setSearchCategory] = useState("license_plate_no"); 
  const [filteredVehicles, setFilteredVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await Admin.getRegisterdVehicles();
        if (response.statusCode === 200) {
          console.log(response.vehiclesDtoList);
          setVehicles(response.vehiclesDtoList);
          setFilteredVehicles(response.vehiclesDtoList);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  
  useEffect(() => {
    const results = vehicles.filter((vehicle) =>
      vehicle[searchCategory]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredVehicles(results);
  }, [searchTerm, searchCategory, vehicles]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-xl font-bold mb-4">Registered Vehicles</h1>

      <div className="flex mb-4 gap-4">
        <select
          className="p-2 rounded-sm bg-slate-800 text-neutral-400"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)} 
        >
          <option value="license_plate_no">License Plate</option>
          <option value="vehicleRegNo">Registration No</option>
          <option value="vehicle_type">Vehicle Type</option>
          <option value="fuel_type">Fuel Type</option>
        </select>

        <input
          type="text"
          className="p-2 rounded-sm bg-slate-800 flex-1"
          placeholder={`Search by ${searchCategory.replace("_", " ")}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="text-orange-400">
            <th className="px-4 py-2 text-left">Vehicle ID</th>
            <th className="px-4 py-2 text-left">License Plate</th>
            <th className="px-4 py-2 text-left">Registration No</th>
            <th className="px-4 py-2 text-left">Vehicle Type</th>
            <th className="px-4 py-2 text-left">Fuel Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <tr
                key={vehicle.vehicleId}
                className="border-b-2 border-neutral-500"
              >
                <td className="px-4 py-6 text-neutral-400">
                  {vehicle.vehicleId}
                </td>
                <td className="px-4 py-2 text-neutral-400">
                  {vehicle.license_plate_no}
                </td>
                <td className="px-4 py-2 text-neutral-400">
                  {vehicle.vehicleRegNo}
                </td>
                <td className="px-4 py-2 text-neutral-400">
                  {vehicle.vehicle_type}
                </td>
                <td className="px-4 py-2 text-neutral-400">
                  {vehicle.fuel_type}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4 text-neutral-500">
                No vehicles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRegisteredVehicle;
