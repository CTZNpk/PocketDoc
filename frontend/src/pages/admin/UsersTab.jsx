// UsersTab.jsx
import React, { useEffect, useState } from "react";
import { Filter, Plus, Eye, Trash2 } from "lucide-react";
import { getAllUsers, deleteUser } from "@/api/adminService";

const StatusBadge = ({ status }) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  const statusClasses = {
    Active: "bg-green-900/20 text-green-400 border border-green-800",
    Pending: "bg-yellow-900/20 text-yellow-400 border border-yellow-800",
    Inactive: "bg-gray-900/20 text-gray-400 border border-gray-800",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
  );
};

export default function UsersTab() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const result = await getAllUsers();
      setUsers(result);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl shadow-cyan-900/10 overflow-hidden border border-gray-800">
      <div className="flex justify-between items-center p-6 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Users</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Content
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-800">
            {users &&
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-cyan-900/30 border border-cyan-800 flex items-center justify-center">
                        <span className="text-cyan-400 font-medium">
                          {user.username.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-200">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={"Active"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {user.documents} docs, {user.quizzes} quizzes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
