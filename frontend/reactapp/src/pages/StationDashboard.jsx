// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import StationHeader from "./StationHeader";
import StationSidebar from "./StationSidebar";
const StationDashboard = () => {
  return (
    <div className="flex h-screen">
      <StationSidebar />
      <div className="flex flex-col flex-1">
        <StationHeader />
        <div className="bg-gray-800 h-full pl-32 ">
           
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StationDashboard;
