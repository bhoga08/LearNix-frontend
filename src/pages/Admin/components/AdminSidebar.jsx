
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiTarget,
  FiBarChart2,
  FiSettings,
  FiLogOut
} from "react-icons/fi";

import "./AdminSidebar.css";

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>

        <div className="logo">
          <h2>Learnix</h2>
          <p>Admin Panel</p>
        </div>

        <nav>
          <NavLink to="/admin" end className="admin-link" onClick={closeSidebar}>
            <FiHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/users" className="admin-link" onClick={closeSidebar}>
            <FiUsers />
            <span>Users</span>
          </NavLink>

          <NavLink to="/admin/sessions" className="admin-link" onClick={closeSidebar}>
            <FiBook />
            <span>Sessions</span>
          </NavLink>

          <NavLink to="/admin/goals" className="admin-link" onClick={closeSidebar}>
            <FiTarget />
            <span>Goals</span>
          </NavLink>

          <NavLink to="/admin/analytics" className="admin-link" onClick={closeSidebar}>
            <FiBarChart2 />
            <span>Analytics</span>
          </NavLink>

          <NavLink to="/admin/settings" className="admin-link" onClick={closeSidebar}>
            <FiSettings />
            <span>Settings</span>
          </NavLink>
        </nav>

        <NavLink to="/" className="admin-link logout" onClick={closeSidebar}>
          <FiLogOut />
          <span>Logout</span>
        </NavLink>

      </aside>
    </>
  );
};

export default AdminSidebar;
