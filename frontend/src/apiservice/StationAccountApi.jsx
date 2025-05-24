import axios from "axios";

export default class StationAccountApi {
  static BASE_URL = "http://localhost:8080";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    };
  }

  //This is a new station registration
  static async registerStation(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/api/station/registration`,
      registration,
       
    );
    return response.data;
  }

  static async getStationDetails() {
    const stationI = localStorage.getItem("stationId");

    const response = await axios.get(
      `${this.BASE_URL}/api/station/stations/${stationI}`,
      {},
      
    );

    return response.data;
  }
}
