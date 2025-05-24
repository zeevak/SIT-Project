import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  History,
  CreditCard,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

const UserSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-neutral-400 h-screen fixed shadow-xl z-50 flex flex-col p-4 space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4 tracking-wide text-white">
              <img
                src="../src/Assets/Monochrome Ilustration Graffiti Logo new.png"
                alt=""
                className="w-[125px] "
              />
            
      </h2>

      {/* Dashboard */}
      <NavLink
        to="/users"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <LayoutDashboard size={18} /> Dashboard
      </NavLink>

      {/* Register Vehicle */}
      <NavLink
        to="/users/vehicleRegister"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <Car size={18} /> Register Vehicle
      </NavLink>

      {/* Vehicle History */}
      <NavLink
        to="/users/vehicleHistory"
        className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
      >
        <History size={18} /> Vehicle History
      </NavLink>

      {/* Transaction History */}
      <NavLink
        to="/users/vtransaction"
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
        to="/users/vprofile"
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
      <div className="absolute bottom-7 text-orange-700">
        
      </div>
    </div>
  );
};

export default UserSidebar;
