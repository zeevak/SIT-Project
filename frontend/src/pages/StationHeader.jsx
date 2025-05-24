import React from "react";
import {
  Bell,
  LogOut,
  Settings,
  UserCircle,
  Menu,
  House
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";


const StationHeader = () => {
     const [profileData, setProfileData] = useState({
        firstname: '',
        username: '',
        telno: '',
        nic: '',
        licenseNumber: '',
        imageData: '',
        imageType: '',
        imageName: ''
      })
        const [selectedImage, setSelectedImage] = useState(null);
        const [previewUrl, setPreviewUrl] = useState(null);

    const fetchProfile = async () => {
        try {
          const userId = localStorage.getItem('userId');
          const response = await axios.get(`http://localhost:8080/api/account/${userId}`);
        //   setProfileData(response.data.userAccountDto);
          // Fetch profile image as Base64
          console.log(response.data.userAccountDto)
          
         setPreviewUrl(`data:${response.data.userAccountDto.imageType};base64,${response.data.userAccountDto.imageData}`);
          
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };


      useEffect(() => {
        fetchProfile();
      }, [profileData]);
    
  return (
    <header className="fixed w-full top-0 left-0 z-40 bg-gray-1000 shadow-md px-6 py-4 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center gap-3">
        <Menu className="text-gray-600 cursor-pointer" size={24} />
        <h1 className="text-xl font-semibold text-white pl-64">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Notifications */}
        <Link to="/"><House className="text-white hover:text-blue-500 cursor-pointer" size={22} /></Link>

        <div className="relative">
          <Bell className=" hover:text-yellow-500 cursor-pointer text-white" size={22} />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            3
          </span>
        </div>

        {/* Settings */}
        <Settings className="text-white hover:text-blue-500 cursor-pointer" size={22} />

        {/* Profile Image */}
        <Link to="/stationOwner/profile"> <img
              src={previewUrl || 'https://via.placeholder.com/150'} // Fallback to placeholder if no image
              alt="Profile"
          className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover shadow-md cursor-pointer"

            /></Link>
       

        {/* Logout Button */}
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default StationHeader;
