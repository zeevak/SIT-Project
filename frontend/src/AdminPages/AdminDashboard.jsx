import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Settings,
  User,
  MapPin,
  Car,
  LogOut,
  ChevronDown,
  Bell,
  Fuel,
  Droplets,
} from "lucide-react";
import Admin from "../apiservice/Admin";
import Authentication from "../apiservice/Authentication";
import { div } from "framer-motion/client";


const AdminDashboard = () => {
  const [manageStationsOpen, setManageStationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  const navigate = useNavigate();
    const isAuthenticated = Authentication.isAuthenticated();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await Admin.getRegisterdStations();

        if (response.statusCode === 200) {
          const stations = response.stationDtosList;

          const filteredStations = stations.filter(
            (station) => !station.fuel || station.fuel === "N/A"
          );
          setFilteredStations(filteredStations);
        }
      } catch (err) {
        console.error("Error fetching stations:", err);
      }
    };

    fetchStations();
  }, [filteredStations.length]);

  const toggleManageStations = () => {
    setManageStationsOpen(!manageStationsOpen);
  };
 
   const handleLogout = () => {
      Authentication.logout();
      navigate("/");
    };

  const filterLinks = (links) => {
    return links.filter((link) =>
      link.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const dashboardLinks = [
    {
      to: "/admin",
      icon: <Home className="mr-2" size={16} />,
      text: "Dashboard Home",
    },
    {
      to: "/admin/reports",
      icon: <FileText className="mr-2" size={16} />,
      text: "Reports",
    },
  ];

  const manageStationsLinks = [
    {
      to: "/admin/viewStations",
      icon: <Fuel className="mr-2" size={16} />,
      text: "View All Stations",
    },
    {
      to: "/admin/UpdateStationFuel",
      icon: <Car className="mr-2" size={16} />,
      text: "Update Fuel Capacity",
    },
    {
      to: "/admin/updateStation",
      icon: <MapPin className="mr-2" size={16} />,
      text: "Update Fuel Stations",
    },
  ];

  const manageVehicleLinks = [
    {
      to: "/admin/registeredVehicles",
      icon: <Car className="mr-2" size={16} />,
      text: "Registered Vehicles",
    },
    {
      to: "/admin/availableVehicles",
      icon: <Car className="mr-2" size={16} />,
      text: "Available Vehicles",
    },
  ];

  const userLinks = [
    {
      to: "/admin/manageuser",
      icon: <User className="mr-2" size={16} />,
      text: "Admin",
    },
  ];

  const fuelLinks = [
    {
      to: "/admin/fuelTypes",
      icon: <Droplets className="mr-2" size={16} />,
      text: "Fuel Types",
    },
  ];

  const settingsLinks = [
    {
      to: "/admin/notification",
      icon: <Bell className="mr-2" size={16} />,
      text: "Notifications",
    },
    {
      to: "#",
      icon: <LogOut className="mr-2" size={16} />,
      text: "Log Out",
      action: handleLogout,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-56 bg-slate-800 text-white shadow-2xl border-r border-neutral-500 p-1 fixed h-screen">
        <div className="flex items-center justify-between">
          <img
            src="../src/Assets/Monochrome Ilustration Graffiti Logo new.png"
            alt="Logo"
            className="w-[130px] p-2 mb-4"
          />
        </div>

        <div>
          <input
            type="text"
            className="bg-slate-700 border border-neutral-500 p-1 text-sm rounded-lg w-full placeholder-gray-300"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <nav className="mt-6 text-neutral-300 flex flex-col items-start gap-3">
          <div className="space-y-1">
            <h1 className="text-lg font-medium px-2 text-neutral-400">Dashboard</h1>
            {filterLinks(dashboardLinks).map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <h1 className="text-lg font-medium px-2 text-neutral-400">Manage Stations</h1>
            <button
              className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md w-full justify-between text-sm"
              onClick={toggleManageStations}
            >
              <Fuel className="mr-2" size={16} />
              Manage Stations
              <ChevronDown
                className={`ml-2 transition-transform ${manageStationsOpen ? "rotate-180" : ""}`}
                size={16}
              />
            </button>
            {manageStationsOpen && (
              <div className="space-y-1 pl-6 mt-1">
                {filterLinks(manageStationsLinks).map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h1 className="text-lg font-medium px-2 text-neutral-400">Manage Vehicle</h1>
            {filterLinks(manageVehicleLinks).map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <h1 className="text-lg font-medium px-2 text-neutral-400">Fuel Management</h1>
            {filterLinks(fuelLinks).map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <h1 className="text-lg font-medium px-2 text-neutral-400">Users</h1>
            {filterLinks(userLinks).map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm"
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <h1 className="text-lg font-medium px-2 text-neutral-400">Settings</h1>
            {settingsLinks.map((link, index) => (
              link.action ? (
                <button
                  key={index}
                  onClick={link.action}
                  className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm w-full text-left"
                >
                  {link.icon}
                  {link.text}
                </button>
              ) : (
                index==0?
               ( 
               <div className="flex justify-between items-center"> 
               <Link
               key={index}
               to={link.to}
               className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm"
             >
               {link.icon}
               {link.text}
             </Link>
             {filteredStations.length > 0 && (
  <div className="bg-red-600 w-[25px] rounded-full h-[25px] ml-5 flex items-center justify-center">
    <span className="text-white text-sm">
      {filteredStations.length}
    </span>
  </div>
)}

             
             </div>
               
              ):(
                  <Link
                  key={index}
                  to={link.to}
                  className="flex items-center py-1.5 px-3 hover:bg-slate-700 rounded-md text-sm"
                >
                  {link.icon}
                  {link.text}
                </Link>
                )
              )
            ))}
          </div>
        </nav>
      </div>

      <div className="flex-1 p-8 bg-slate-900 ml-52">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
