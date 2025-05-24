// src/layouts/UserLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserSidebar from "./UserSidebar";
const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex flex-col flex-1">
        <UserHeader />
        <div className="bg-gray-800  pl-32 ">
           
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
