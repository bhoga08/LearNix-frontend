
import React from "react";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiMoon,
  FiMenu,
  FiX
} from "react-icons/fi";

import "./AdminNavbar.css";

const AdminNavbar = ({ toggleSidebar, isOpen }) => {
  return (
    <header className="admin-navbar">

      <button
        className="hamburger"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className="search-box">
        <FiSearch />
        <input
          type="text"
          placeholder="Search users, sessions..."
        />
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <FiMoon />
        </button>

        <button className="icon-btn">
          <FiBell />
        </button>

        <div className="admin-profile">
          <FiUser />
          <div>
            <h4>Admin</h4>
            <p>Administrator</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;
