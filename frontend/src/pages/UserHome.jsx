import React, { useEffect, useState } from "react";
import pngImage1 from "../Assets/—Pngtree—delivery boy in bike out_6631607.png";
import pngImage2 from "../Assets/bus-png-30669.png";
import pngImage3 from "../Assets/—Pngtree—orange van volkswagon bus_5954763.png";
import axios from "axios";
import {
  BadgeCent,
  Fuel,
  UserCircle,
  PlusCircle,
  Info,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#ffc658", "#82ca9d"];

const UserHome = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleType, setVehicleType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [regDate, setRegDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(
          `http://localhost:8080/api/allVehicleDetails/${userId}`
        );
        setVehicles(response.data.vehiclesDtoList || []);
      } catch (error) {
        console.error("Failed to fetch vehicle data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      (vehicleType ? vehicle.vehicle_type.trim() === vehicleType : true) &&
      (fuelType ? vehicle.fuel_type === fuelType : true) &&
      (regDate ? vehicle.regDate === regDate : true)
    );
  });

  const countByType = (type) =>
    vehicles.filter((vehicle) => vehicle.vehicle_type.trim() === type).length;

  const hasType = (type) =>
    vehicles.some((vehicle) => vehicle.vehicle_type.trim() === type);

  const vehicleTypeData = [
    { name: "Bike", value: countByType("Bike") },
    { name: "Bus", value: countByType("Bus") },
    { name: "Van", value: countByType("Van") },
  ].filter((v) => v.value > 0);

  const fuelTypeData = ["Petrol", "Diesel", "Electric"].map((fuel) => ({
    name: fuel,
    value: vehicles.filter((v) => v.fuel_type === fuel).length,
  })).filter(v => v.value > 0);

  return (
    <div className="pl-56 mt-28 pr-6 py-7">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between text-white">
        <div>
          <h1 className="text-2xl font-semibold">Welcome back, User!</h1>
          <p className="text-sm text-gray-400">Here's your vehicle dashboard</p>
        </div>
        <UserCircle className="w-10 h-10 text-blue-400" />
      </div>

      {/* Summary Cards */}
      <div className="py-7 border-b border-gray-700 flex flex-col">
        <h2 className="text-xl text-white font-semibold mb-4">
          Vehicle Summary by Type
        </h2>
        <div className="my-4 flex flex-wrap gap-3">
          {hasType("Bike") && (
            <div className="w-[180px] h-[100px] bg-rose-200 rounded-lg flex items-center border-b-8 border-rose-500 transition-transform hover:scale-105 hover:shadow-lg duration-200">
              <div className="flex flex-col p-3">
                <span className="text-3xl font-bold">{countByType("Bike")}</span>
                <span className="text-xs font-semibold">Motor Bike</span>
              </div>
              <div className="w-[70px]">
                <img src={pngImage1} alt="bike" />
              </div>
            </div>
          )}
          {hasType("Bus") && (
            <div className="w-[180px] h-[100px] bg-yellow-200 rounded-lg flex items-center justify-between border-b-8 border-yellow-500 transition-transform hover:scale-105 hover:shadow-lg duration-200">
              <div className="flex flex-col p-3">
                <span className="text-3xl font-bold">{countByType("Bus")}</span>
                <span className="text-xs font-semibold">Bus</span>
              </div>
              <div className="w-[70px]">
                <img src={pngImage2} alt="bus" />
              </div>
            </div>
          )}
          {hasType("Van") && (
            <div className="w-[180px] h-[100px] bg-blue-200 rounded-lg flex items-center justify-between border-b-8 border-blue-500 transition-transform hover:scale-105 hover:shadow-lg duration-200">
              <div className="flex flex-col p-3">
                <span className="text-3xl font-bold">{countByType("Van")}</span>
                <span className="text-xs font-semibold">Van</span>
              </div>
              <div className="w-[70px]">
                <img src={pngImage3} alt="van" />
              </div>
            </div>
          )}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-900 rounded-lg p-4 shadow border border-gray-700">
            <h2 className="text-gray-400 text-sm">Total Vehicles</h2>
            <p className="text-white text-3xl font-bold">{vehicles.length}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 shadow border border-gray-700">
            <h2 className="text-gray-400 text-sm">Registered Types</h2>
            <p className="text-white text-lg font-semibold">
              {["Bike", "Bus", "Van"].filter(hasType).join(", ")}
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 shadow border border-gray-700">
            <h2 className="text-gray-400 text-sm">Filters Applied</h2>
            <p className="text-orange-400">
              {vehicleType || fuelType || regDate
                ? `${vehicleType || ""} ${fuelType || ""} ${regDate || ""}`
                : "None"}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-2">Vehicle Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={vehicleTypeData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {vehicleTypeData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-white text-lg font-semibold mb-2">Fuel Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fuelTypeData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#00BFFF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction & Fuel Summary */}
        <div className="text-gray-400 py-6 flex items-center gap-8">
          <div className="flex items-center gap-2 border p-1 rounded-lg border-yellow-600 text-sm">
            <BadgeCent className="inline w-[20px] rounded-full text-orange-600" /> Total Transaction{" "}
            <span className="text-white text-xl">24</span>
          </div>
          <div className="flex items-center gap-2 p-1 border rounded-lg border-yellow-600 text-sm">
            <Fuel className="inline w-[20px] rounded-full text-orange-600" /> Available Fuel{" "}
            <span className="text-white text-xl">24L</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-4">
          <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg">
            <PlusCircle size={18} /> Add New Vehicle
          </button>
          <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg">
            <Fuel size={18} /> Request Fuel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="py-4 text-2xl uppercase text-white font-semibold">
        <span className="text-orange-500">Vehicle</span>{" "}
        <span className="text-blue-700">Details</span>
      </div>

      <div className="flex gap-5 mb-6 flex-wrap items-center">
        <select
          onChange={(e) => setVehicleType(e.target.value)}
          value={vehicleType}
          className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Filter by Type</option>
          <option value="Bike">Bike</option>
          <option value="Van">Van</option>
          <option value="Bus">Bus</option>
        </select>
        <select
          onChange={(e) => setFuelType(e.target.value)}
          value={fuelType}
          className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
        >
          <option value="">Filter by Fuel Type</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
        <input
          type="date"
          onChange={(e) => setRegDate(e.target.value)}
          value={regDate}
          className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
        />
        <button
          onClick={() => {
            setVehicleType("");
            setFuelType("");
            setRegDate("");
          }}
          className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-white text-sm border border-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2 border border-gray-700">Vehicle Type</th>
              <th className="p-2 border border-gray-700">Fuel Type</th>
              <th className="p-2 border border-gray-700">Reg No</th>
              <th className="p-2 border border-gray-700">License Plate No</th>
              <th className="p-2 border border-gray-700">Fuel Capacity</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="bg-gray-900 hover:bg-gray-800">
                  <td className="p-2 border border-gray-700">
                    {vehicle.vehicle_type}
                  </td>
                  <td className="p-2 border border-gray-700">
                    <span className="flex items-center gap-2">
                      <Fuel size={16} className="text-yellow-500" />
                      {vehicle.fuel_type}
                    </span>
                  </td>
                  <td className="p-2 border border-gray-700">{vehicle.vehicleRegNo}</td>
                  <td className="p-2 border border-gray-700">{vehicle.license_plate_no}</td>
                  <td className="p-2 border border-gray-700">{vehicle.availableFuelCapacity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8">
                  <div className="flex flex-col items-center text-gray-400">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                      alt="No vehicles"
                      className="w-16 h-16 mb-2"
                    />
                    <p>No vehicles found with selected filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
                                                  
      {/* Info */}
      <div className="mt-8 bg-gray-800 border border-gray-700 text-gray-300 p-4 rounded-lg flex items-start gap-3">
        <Info className="text-blue-400 mt-1" />
        <div>
          <p className="font-semibold text-white">Pro Tip:</p>
          <p className="text-sm">
            Keep your vehicles topped up and serviced regularly for fuel efficiency.
            Electric vehicles offer cost-effective long-term fuel management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
