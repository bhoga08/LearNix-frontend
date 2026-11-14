
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiUsers,
  FiSearch,
  FiTrash2,
  FiUser,
  FiPhone,
  FiRefreshCw
} from "react-icons/fi";

import "./Users.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "https://my-project-nsjg.onrender.com/api/admin/users"
      );

      setUsers(res.data.users || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://my-project-nsjg.onrender.com/api/admin/users/${id}`
      );

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.log(error);
      alert("Unable to delete user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const username = (user.username || "").toLowerCase();
    const mobile = String(user.mobileNumber || "");

    return (
      username.includes(search.toLowerCase()) ||
      mobile.includes(search)
    );
  });

  return (
    <div className="admin-layout">

      <AdminSidebar
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
      />

      <div className="admin-dashboard">

        <AdminNavbar
          toggleSidebar={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />

        <div className="users-page">

          {/* Page Heading */}
          <div className="users-heading">
            <div>
              <h1>Users Management</h1>
              <p>Manage and monitor all registered users.</p>
            </div>

            <button className="refresh-btn" onClick={fetchUsers}>
              <FiRefreshCw />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="users-stats">

            <div className="users-stat-card">
              <div className="users-stat-icon">
                <FiUsers />
              </div>

              <div>
                <p>Total Registered Users</p>
                <h2>{users.length}</h2>
                <span>All registered accounts</span>
              </div>
            </div>

            <div className="users-stat-card">
              <div className="users-stat-icon green-icon">
                <FiUser />
              </div>

              <div>
                <p>Showing Users</p>
                <h2>{filteredUsers.length}</h2>
                <span>Based on current search</span>
              </div>
            </div>

          </div>

          {/* Users Table Section */}
          <div className="users-table-container">

            <div className="table-header">
              <div>
                <h2>All Users</h2>
                <p>Complete list of registered users</p>
              </div>

              <div className="users-search">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search username or mobile..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="users-table-wrapper">
              <table className="users-table">

                <thead>
                  <tr>
                    <th>USER</th>
                    <th>MOBILE NUMBER</th>
                    <th>USER ID</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="empty-users">
                        Loading users...
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={user._id}>

                        <td>
                          <div className="user-info">
                            <div className="user-avatar">
                              <FiUser />
                            </div>

                            <div>
                              <strong>{user.username}</strong>
                              <small>Registered User</small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="mobile-info">
                            <FiPhone />
                            {user.mobileNumber || "Not available"}
                          </div>
                        </td>

                        <td>
                          <span className="user-id">
                            {user._id.slice(-8)}
                          </span>
                        </td>

                        <td>
                          <button
                            className="delete-user"
                            onClick={() => deleteUser(user._id)}
                          >
                            <FiTrash2 />
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="empty-users">
                        No users found!
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

            <div className="table-footer">
              Showing {filteredUsers.length} of {users.length} users
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Users;
