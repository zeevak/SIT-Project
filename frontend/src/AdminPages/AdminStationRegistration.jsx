import React, { useState } from "react";
import axios from "axios";

const AdminStationRegistration = () => {
  const [formData, setFormData] = useState({
    stationId: "",
    stationAddress: "",
    dealerName: "",
    licenseNumber: "",
    registrationDate: "",
    loginCode: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/admin/addStation", formData);
      setSuccessMessage("Station registered successfully!");
      setErrorMessage("");
      setFormData({
        stationId: "",
        stationAddress: "",
        dealerName: "",
        licenseNumber: "",
        registrationDate: "",
        loginCode: "",
      });
    } catch (error) {
      setErrorMessage("Failed to register station. Please try again.");
      setSuccessMessage("");
      console.error(error);
    }
  };

  return (
    <div className="registration-form">
      <h2>Register Fuel Station</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Station ID:</label>
          <input
            type="text"
            name="stationId"
            value={formData.stationId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Station Address:</label>
          <input
            type="text"
            name="stationAddress"
            value={formData.stationAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Dealer Name:</label>
          <input
            type="text"
            name="dealerName"
            value={formData.dealerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>License Number:</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Registration Date:</label>
          <input
            type="date"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Login Code:</label>
          <input
            type="text"
            name="loginCode"
            value={formData.loginCode}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register Station</button>
      </form>
    </div>
  );
};

export default AdminStationRegistration;
