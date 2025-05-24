import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Camera, Save, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';

const VehicleOwnerProfile = () => {
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
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:8080/api/account/${userId}`);
      setProfileData(response.data.userAccountDto);
      // Fetch profile image as Base64
      if (response.data.userAccountDto.imageData) {
        setPreviewUrl(`data:${response.data.userAccountDto.imageType};base64,${response.data.userAccountDto.imageData}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    try {
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
      alert('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-800 via-slate-800 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-10 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
          <h2 className="text-3xl font-extrabold tracking-wide">Vehicle Owner Profile</h2>
          <button
            onClick={() => {
              if (isEditing) handleSave();
              else setIsEditing(true);
            }}
            className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-blue-700 transition rounded-full text-white font-medium shadow-lg"
          >
            {isEditing ? <Save size={18} /> : <Pencil size={18} />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <img
              src={previewUrl || 'https://via.placeholder.com/150'} // Fallback to placeholder if no image
              alt="Profile"
              className="w-44 h-44 rounded-full object-cover border-4 border-blue-500 shadow-lg"
            />
            {isEditing && (
              <label className="absolute bottom-2 right-2 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition">
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

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {[{ label: 'Full Name', name: 'firstname' },
              { label: 'Email Address', name: 'username' },
              { label: 'Phone Number', name: 'telno' },
              { label: 'NIC', name: 'nic' },
              { label: 'Role', name: 'role' }].map(({ label, name }) => (
              <div key={name}>
                <label className="block text-sm text-white/80 font-medium mb-1">{label}</label>
                <input
                  type="text"
                  name={name}
                  value={profileData[name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-blue-500 transition ${
                    isEditing ? '' : 'cursor-not-allowed'
                  }`}
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VehicleOwnerProfile;
