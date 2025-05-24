import React, { useEffect, useState } from "react";
import Admin from "../apiservice/Admin";

const FuelManage = () => {
  const [fuelPriceList, setFuelPriceList] = useState([]);
  const [error, setError] = useState(null);
  const [editingFuelPriceId, setEditingFuelPriceId] = useState(null);
  const [updatedFuelName, setUpdatedFuelName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchFuelPrices = async () => {
      try {
        const response = await Admin.getFuelPriceList();
        if (response.statusCode === 200) {
          setFuelPriceList(response.fuelPriceDtoList);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to fetch fuel prices.");
      }
    };

    fetchFuelPrices();
  }, []);

  const handleUpdate = (fuelPrice) => {
    setEditingFuelPriceId(fuelPrice.id);
    setUpdatedFuelName(fuelPrice.fuelName);
    setUpdatedPrice(fuelPrice.price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updatedFuelName || updatedPrice === "") {
      setFormError("Both fields are required.");
      return;
    }

    try {
      const updatedFuelPriceData = {
        fuelName: updatedFuelName,
        price: parseFloat(updatedPrice),
      };

      const response = await Admin.updateFuelPrice(
        editingFuelPriceId,
        updatedFuelPriceData
      );

      if (response.statusCode === 200) {
        setFuelPriceList((prev) =>
          prev.map((fuelPrice) =>
            fuelPrice.id === editingFuelPriceId
              ? {
                  ...fuelPrice,
                  fuelName: updatedFuelName,
                  price: updatedPrice,
                }
              : fuelPrice
          )
        );
        setEditingFuelPriceId(null);
      } else {
        setFormError("Failed to update fuel price.");
      }
    } catch (err) {
      console.log(err);
      setFormError("Error updating fuel price.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Fuel Price Management
      </h1>

      {editingFuelPriceId ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="p-4 bg-slate-800 rounded-lg w-[90%] max-w-lg text-neutral-400">
            <h2 className="text-xl text-white mb-7">Edit Fuel Price</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white">Fuel Name</label>
                <input
                  type="text"
                  value={updatedFuelName}
                  onChange={(e) => setUpdatedFuelName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-700 text-white"
                />
              </div>
              <div>
                <label className="text-white">Fuel Price</label>
                <input
                  type="number"
                  value={updatedPrice}
                  onChange={(e) => setUpdatedPrice(e.target.value)}
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
                  onClick={() => setEditingFuelPriceId(null)}
                  className="px-4 py-2 bg-red-600 rounded-lg text-white"
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
                <th className="text-orange-500 px-4 py-2">Fuel ID</th>
                <th className="text-orange-500 px-4 py-2">Fuel Name</th>
                <th className="text-orange-500 px-4 py-2">Price</th>
                <th className="text-orange-500 px-4 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {fuelPriceList.length > 0 ? (
                fuelPriceList.map((fuelPrice) => (
                  <tr
                    key={fuelPrice.id}
                    className="border-b border-neutral-500 text-sm"
                  >
                    <td className="px-4 py-6 text-neutral-400">
                      {fuelPrice.id}
                    </td>
                    <td className="px-4 py-2 text-neutral-400">
                      {fuelPrice.fId}
                    </td>
                    <td className="px-4 py-2 text-neutral-400">
                      {fuelPrice.fuelName}
                    </td>
                    <td className="px-4 py-2 text-neutral-400">
                      {fuelPrice.price}
                    </td>
                    <td>
                      <button
                        onClick={() => handleUpdate(fuelPrice)}
                        className="px-4 py-2 w-[150px] rounded-lg bg-green-500"
                      >
                        UPDATE
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-white">
                    No fuel prices found
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

export default FuelManage;
