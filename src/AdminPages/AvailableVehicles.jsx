import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import VehicleApi from "../apiservice/VehicleApi";

const AvailableVehicles = () => {
  const [vehicleList, setVehicleList] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [addingVehicle, setAddingVehicle] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: "",
    fuelCapacity: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      vehicleType: vehicle.vehicleType,
      fuelCapacity: vehicle.fuelCapacity,
    });
  };

  const handleDelete = async (id) => {
    const response = await VehicleApi.deleteAvailableVehicle(id);
    if (response.statusCode === 200) {
      setVehicleList(vehicleList.filter((vehicle) => vehicle.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    const updatedVehicle = {
      ...editingVehicle,
      vehicleType: formData.vehicleType,
      fuelCapacity: formData.fuelCapacity,
    };
    const response = await VehicleApi.updateAvailableVehicle(editingVehicle.id, updatedVehicle);
    if (response.statusCode === 200) {
      setVehicleList(vehicleList.map((vehicle) =>
        vehicle.id === editingVehicle.id ? updatedVehicle : vehicle
      ));
      setEditingVehicle(null);
    }
  };

  const handleAdd = async () => {
    const newVehicle = {
      vehicleType: formData.vehicleType,
      fuelCapacity: formData.fuelCapacity,
    };
    const response = await VehicleApi.addAvailableVehicle(newVehicle);
    if (response.statusCode === 200) {
      setVehicleList([...vehicleList, response.vehicle]);
      setAddingVehicle(false);
      setFormData({ vehicleType: "", fuelCapacity: "" });
    }
  };

  useEffect(() => {
    const getVehicleDetails = async () => {
      const response = await VehicleApi.getAvailableVehicles();
      if (response.statusCode === 200) {
        setVehicleList(response.vehicleDtoList);
      }
    };
    getVehicleDetails();
  }, []);

  const filteredVehicles = vehicleList.filter((vehicle) =>
    vehicle.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Available Vehicles</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search by Vehicle Type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 text-white rounded-md p-2 pl-10 w-full"
          />
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
        </div>

        <button
          onClick={() => setAddingVehicle(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-slate-800 rounded-lg">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Vehicle Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Fuel Capacity</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVehicles.map((vehicle, index) => (
              <tr
                key={vehicle.id}
                className={index % 2 === 0 ? "bg-slate-900" : "bg-slate-800"}
              >
                <td className="px-6 py-4">{vehicle.id}</td>
                <td className="px-6 py-4">{vehicle.vehicleType}</td>
                <td className="px-6 py-4">{vehicle.fuelCapacity} L</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredVehicles.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(editingVehicle || addingVehicle) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              {editingVehicle ? `Edit Vehicle ID: ${editingVehicle.id}` : "Add New Vehicle"}
            </h2>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Vehicle Type</label>
              <input
                type="text"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded-lg text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm">Fuel Capacity (L)</label>
              <input
                type="number"
                name="fuelCapacity"
                value={formData.fuelCapacity}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded-lg text-white"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={editingVehicle ? handleUpdate : handleAdd}
              >
                {editingVehicle ? "Update" : "Add"}
              </button>
              <button
                className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700"
                onClick={() => {
                  setEditingVehicle(null);
                  setAddingVehicle(false);
                  setFormData({ vehicleType: "", fuelCapacity: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableVehicles;
