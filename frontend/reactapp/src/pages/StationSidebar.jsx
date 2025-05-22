import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Fuel,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const StationSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-neutral-400 h-screen fixed shadow-xl z-50 flex flex-col p-4 space-y-4">
      <div className="text-center mb-4">
        <img
          src="../src/Assets/Monochrome Ilustration Graffiti Logo new.png"
          alt="Logo"
          className="w-[125px] mx-auto"
        />
      </div>

      {/* Dashboard */}
      <NavLink
        to="/stationOwner"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      {/* Register Station */}
      <NavLink
        to="/stationOwner/stationRegister"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <Fuel size={18} /> Register Station
      </NavLink>

      {/* Transaction History */}
      <NavLink
        to="/stationOwner/stransaction"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <CreditCard size={18} /> Transaction History
      </NavLink>

      {/* Notifications */}
      <NavLink
        to="/user/notifications"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <Bell size={18} /> Notifications
      </NavLink>

      {/* Settings */}
      <NavLink
        to="/stationOwner/profile"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <Settings size={18} /> Profile
      </NavLink>

      {/* Logout */}
      <NavLink
        to="/logout"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition mt-auto"
      >
        <LogOut size={18} /> Logout
      </NavLink>
    </div>
  );
};

export default StationSidebar;
