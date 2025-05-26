import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Camera, Save, Pencil, User, Mail, Phone, CreditCard, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const StationOwnerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstname: '',
    username: '',
    telno: '',
    nic: '',
    licenseNumber: '',
    imageData: '',
    imageType: '',
    imageName: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/account/${userId}`);
      setProfileData(response.data.userAccountDto);
      if (response.data.userAccountDto.imageData) {
        setPreviewUrl(`data:${response.data.userAccountDto.imageType};base64,${response.data.userAccountDto.imageData}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');
      const formData = new FormData();

      formData.append('userAccount', new Blob([JSON.stringify(profileData)], {
        type: 'application/json'
      }));

      if (selectedImage) {
        formData.append('file', selectedImage);
      }

      await axios.put(`http://localhost:8080/api/update/${userId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fieldGroups = [
    [
      { label: 'Full Name', name: 'firstname', icon: <User size={18} className="text-blue-400" /> },
      { label: 'Phone Number', name: 'telno', icon: <Phone size={18} className="text-blue-400" /> },
      { label: 'License Number', name: 'licenseNumber', icon: <FileText size={18} className="text-blue-400" /> }
    ],
    [
      { label: 'Email Address', name: 'username', icon: <Mail size={18} className="text-blue-400" /> },
      { label: 'NIC', name: 'nic', icon: <CreditCard size={18} className="text-blue-400" /> }
    ]
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6 pr-8 sm:pr-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-white">Station Owner Profile</h1>
            <button
              onClick={() => {
                if (isEditing) handleSave();
                else setIsEditing(true);
              }}
              disabled={isLoading}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all ${
                isEditing 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {isLoading ? (
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : isEditing ? (
                <Save size={18} />
              ) : (
                <Pencil size={18} />
              )}
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="w-36 h-36 rounded-full border-4 border-blue-500/30 overflow-hidden shadow-lg">
                  <img
                    src={previewUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.firstname)}&background=random&color=fff`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-md">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fieldGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="space-y-4">
                    {group.map(({ label, name, icon }) => (
                      <div key={name} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-300">
                          {label}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {icon}
                          </div>
                          <input
                            type="text"
                            name={name}
                            value={profileData[name] || ''}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                              isEditing 
                                ? 'bg-gray-700/50 border-gray-600 text-white' 
                                : 'bg-gray-700/30 border-gray-700 text-gray-300 cursor-not-allowed'
                            }`}
                            placeholder={`Enter ${label.toLowerCase()}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StationOwnerProfile;