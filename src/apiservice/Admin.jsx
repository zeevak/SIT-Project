import axios from "axios";

export default class Authentication {
  static BASE_URL = "http://localhost:8080";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };
  }

  static async getStations() {
    const response = await axios.get(
      `${this.BASE_URL}/api/admin/get-stations-with-status`,
     
    );
    return response.data;
  }
  static async updateStationFuel(stationId, fuel) {
    const response = await axios.post(
      `${this.BASE_URL}/api/fuel/addfuel/${stationId}`,
      fuel,
     
    );
    return response.data;
  }
  static async getRegisterdVehicles() {
    const response = await axios.get(
      `${this.BASE_URL}/api/vehicle/getAllVehicles`,
      
    );
    return response.data;
  }
  static async getRegisterdStations() {
    const response = await axios.get(
      `${this.BASE_URL}/api/station/allstations`,
     
    );
    return response.data;
  }

  static async updateStationFuel(fuel, id) {
    const response = await axios.post(
      `${this.BASE_URL}/api/admin/update-initial-fuel-allocation/${id}`,
      fuel,
     
    );
    return response.data;
  }

  static async updateStations(stationId, station) {
    const response = await axios.put(
      `${this.BASE_URL}/api/station/update/${stationId}`,
      station,
       
    );
    return response.data;
  }

  static async getStationReports() {
    const response = await axios.get(
      `${this.BASE_URL}/api/fuelAllocation/alltransitions`,
       
    );
    return response.data;
  }

  static async getFuelPriceList() {
    const response = await axios.get(`${this.BASE_URL}/api/allfuelPrices`, {
      
    });
    return response.data;
  }

  static async updateFuelPrice(fuelId, fuelPrice) {
    const response = await axios.put(
      `${this.BASE_URL}/api/updatePrice/${fuelId}`,
      fuelPrice,
      
    );
    return response.data;
  }

  static async getFuelByName(name) {
    const response = await axios.get(`${this.BASE_URL}/api/findfuel/${name}`, {
    });
    return response.data;
  }
  static async getRoleAdminMemebers() {
    const response = await axios.get(
      `${this.BASE_URL}/api/by-role`,
     
      

      {
        params: { role: "ADMIN" },
      }
    );
    return response.data;
  }
  static async deleteAdmin(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/api/admin/delete/${userId}`,
     
    );
    return response.data;
  }
}
