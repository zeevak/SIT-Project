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
  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isFuelStationOwner() {
    const role = localStorage.getItem("role");
    return role === "FUELSTATION_OWNER";
  }

  static isVehicleOwner() {
    const role = localStorage.getItem("role");
    return role === "VEHICLE_OWNER";
  }
  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
}
