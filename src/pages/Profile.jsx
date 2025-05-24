import React, { useEffect, useState } from "react";
import UserAccountApi from "../apiservice/UserAccountApi";
import Error from "../responseDisplay/Error";
import Success from "../responseDisplay/Success";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await UserAccountApi.getUserDetails();
      setUser(response.userAccountDto);
      setFormData(response.userAccountDto);
    } catch (err) {
      console.error(err.message || "An unexpected error occurred.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Preview the selected image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateDetails = async (formData) => {
    try {
      const response = await UserAccountApi.updateUserDetails(formData);
      if (response.statusCode === 200) {
        setFormData(response.userAccountDto);
        setUser(response.userAccountDto);
        setError("");
        setSuccess("User Account Updated successfully!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateDetails(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-lg shadow-lg p-6 mt-28">
        {error && <Error error={error} setError={setError} />}
        {success && <Success success={success} setSuccess={setSuccess} />}
        
        <h2 className="text-2xl font-bold text-center mb-6">Profile Details</h2>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6 ">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center">
                <div className="w-[100px] h-[100px] border-4 border-blue-500 shadow-lg rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={formData.profilePic || user.profilePic || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username || "defaultUser"}&size=100`}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-3 text-sm" />
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-200">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-200">Mobile Number</label>
                <input
                  type="text"
                  name="telno"
                  value={formData.telno || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="mt-6 flex justify-end space-x-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm font-medium bg-gray-500 rounded-md hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-blue-600 rounded-md hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              {/* Profile Avatar */}
              <div className="w-[100px] h-[100px] border-4 border-blue-500 shadow-lg rounded-full overflow-hidden bg-gray-100">
                <img
                  src={user.profilePic || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username || "defaultUser"}&size=100`}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="my-10 space-y-6">
                {/* First & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-orange-500">First Name</label>
                    <p className="mt-1 text-lg">{user.firstname}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-orange-500 text-right">Last Name</label>
                    <p className="mt-1 text-lg text-right">{user.lastname}</p>
                  </div>
                </div>

                {/* Mobile Number & Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-orange-500">Mobile Number</label>
                    <p className="mt-1 text-lg">{user.telno}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-orange-500 text-right">Email</label>
                    <p className="mt-1 text-lg text-right ">{user.username}</p>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <div className="mt-6">
                  <button onClick={() => setIsEditing(true)} className="w-full px-4 py-2 text-sm font-medium bg-blue-600 rounded-md hover:bg-blue-700">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
