import React, { useEffect, useState } from "react";
import Admin from "../apiservice/Admin";
import UserAccountApi from "../apiservice/UserAccountApi";

const ManageUser = () => {
  const [adminList, setAdminList] = useState([]);
  const [addingAdmin, setAddingAdmin] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role: "ADMIN", // Default role for admins
  });

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await Admin.getRoleAdminMemebers();
        if (response.statusCode === 200) {
          setAdminList(response.userAccountDtoList || []);
        }
      } catch (error) {
        console.error("Error fetching admin list:", error);
      }
    };
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await Admin.deleteAdmin(id);
      if (response.statusCode === 200) {
        setAdminList((prevList) =>
          prevList.filter((admin) => admin.userId !== id)
        );
        console.log("Admin deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleAddAdmin = async () => {
    try {
      const newAdmin = await UserAccountApi.registerUser(formData);
      if (newAdmin.statusCode === 200) {
        setAdminList((prevList) => [...prevList, newAdmin.userAccountDto]);
        setAddingAdmin(false);
        setFormData({
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          role: "ADMIN",
        });
        console.log("Admin added successfully");
      }
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600"
        onClick={() => setAddingAdmin(true)}
      >
        Add Admin
      </button>

      <table className="min-w-full text-neutral-600 border-separate border-spacing-y-2 table-fixed">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 text-orange-500 w-1/5">ID</th>
            <th className="py-2 px-4 text-orange-500 w-1/5">First Name</th>
            <th className="py-2 px-4 text-orange-500 w-1/5">Last Name</th>
            <th className="py-2 px-4 text-orange-500 w-1/5">Username</th>
            <th className="py-2 px-4 text-orange-500 w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {adminList && adminList.length > 0 ? (
            adminList.map((admin) =>
              admin && admin.userId ? (
                <tr key={admin.userId} className="text-neutral-400">
                  <td className="py-2 px-4">{admin.userId}</td>
                  <td className="py-2 px-4">{admin.firstname}</td>
                  <td className="py-2 px-4">{admin.lastname}</td>
                  <td className="py-2 px-4">{admin.username}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700"
                      onClick={() => handleDelete(admin.userId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No admins available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {addingAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
            <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                First Name:
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-neutral-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Last Name:
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-neutral-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Username:
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-neutral-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg bg-neutral-500"
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-600"
                onClick={handleAddAdmin}
              >
                Add Admin
              </button>
              <button
                className="bg-gray-500 px-4 py-2 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setAddingAdmin(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
