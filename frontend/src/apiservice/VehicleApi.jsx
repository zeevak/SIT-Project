import axios from "axios";

export default class VehicleApi {
  static BASE_URL = "http://localhost:8080";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };
  }

  static async registerVehicle(vehicleDetails, fuelAmount) {
    const userId = localStorage.getItem("userId");
    const response = await axios.post(
      `${this.BASE_URL}/api/verifyAndAddVehicle/${userId}/${fuelAmount}`,
      vehicleDetails,
     
    );
    return response.data;
  }

  static async getVehicleDetails() {
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `${this.BASE_URL}/api/allVehicleDetails/${userId}`,
      
    );
    return response.data;
  }

  static async getVehicleTypes() {
    const response = await axios.get(`${this.BASE_URL}/api/vehicleTypes`, {
    });
    return response.data;
  }
  static async findVehicle(vehicleType) {
    const response = await axios.get(
      `${this.BASE_URL}/api/vehicle/${vehicleType}`,
      
    );
    return response.data;
  }

  static async getAvailableVehicles() {
    const response = await axios.get(`${this.BASE_URL}/api/vehicleTypes`, {
    });
    return response.data;
  }
  static async deleteAvailableVehicle(id) {
    const response = await axios.delete(
      `${this.BASE_URL}/api/vehicleType/delete/${id}`,
      
    );
    return response.data;
  }
  static async updateAvailableVehicle(id, formData) {
    const response = await axios.put(
      `${this.BASE_URL}/api/vehicleTypes/update/${id}`,
      formData,

    
    );
    return response.data;
  }
  static async addAvailableVehicle(vehicle) {
    const response = await axios.post(
      `${this.BASE_URL}/api/vehicleTypes/add`,
      vehicle,
     
    );
    return response.data;
  }
}
