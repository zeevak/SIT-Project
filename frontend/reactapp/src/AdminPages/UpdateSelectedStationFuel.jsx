import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Admin from "../apiservice/Admin";

const UpdateSelectedStationFuel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const station = location.state?.station; 

  
  const [dieselQuantity, setDieselQuantity] = useState(
    station?.fuel?.availableDieselQuantity || 0
  );
  const [petrolQuantity, setPetrolQuantity] = useState(
    station?.fuel?.availablePetrolQuantity || 0
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (dieselQuantity < 0 || petrolQuantity < 0) {
      setError("Quantities cannot be negative.");
      return;
    }

    
    const payload = {
      initialDieselAllocation: parseFloat(dieselQuantity),
      initialPetrolAllocation: parseFloat(petrolQuantity),
      station: {
        id: station?.id, 
      },
    };

    try {
      setError(null); 
      setLoading(true); 

      const response = await Admin.updateStationFuel(payload, station?.id);
      console.log("Update successful:", response);

      
      navigate("/admin/UpdateStationFuel", {
        state: { successMessage: "Fuel allocation updated successfully!" },
      });
    } catch (err) {
      console.error("Error updating fuel allocation:", err);
      setError(
        err.response?.data?.message || err.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Update Fuel for Station: {station?.stationId}
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="border border-neutral-700 bg-slate-800 p-4 rounded shadow text-white"
      >
        <div className="mb-4">
          <label className="block text-orange-500 mb-2">Diesel Quantity</label>
          <input
            type="number"
            value={dieselQuantity}
            onChange={(e) => setDieselQuantity(e.target.value)}
            className="w-full px-4 py-2 rounded border border-neutral-500 bg-slate-900 text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-orange-500 mb-2">Petrol Quantity</label>
          <input
            type="number"
            value={petrolQuantity}
            onChange={(e) => setPetrolQuantity(e.target.value)}
            className="w-full px-4 py-2 rounded border border-neutral-500 bg-slate-900 text-white"
            required
          />
        </div>

        <button
          type="submit"
          className={`px-6 py-2 rounded bg-green-600 text-white ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Fuel"}
        </button>
      </form>
    </div>
  );
};

export default UpdateSelectedStationFuel;
