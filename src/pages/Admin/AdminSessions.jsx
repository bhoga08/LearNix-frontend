
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiBook,
  FiSearch,
  FiTrash2,
  FiRefreshCw,
  FiCalendar,
  FiUser,
  FiClock
} from "react-icons/fi";

import "./Sessions.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

const API = axios.create({
  baseURL: "https://my-project-nsjg.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

const AdminSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all sessions
  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/admin/sessions");

      setSessions(res.data.sessions || []);

    } catch (error) {
      console.error("Sessions Error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to load sessions. Please login again."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Delete session
  const deleteSession = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this session?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/sessions/${id}`);

      setSessions((prev) =>
        prev.filter((session) => session._id !== id)
      );

      alert("Session deleted successfully!");

    } catch (error) {
      console.error("Delete Session Error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to delete session."
      );
    }
  };

  // Search sessions
  const filteredSessions = sessions.filter((session) => {
    const topic = (
      session.topic || ""
    ).toLowerCase();

    const language = (
      session.programmingLanguage || ""
    ).toLowerCase();

    const username = (
      session.owner?.username || ""
    ).toLowerCase();

    const searchValue = search.toLowerCase();

    return (
      topic.includes(searchValue) ||
      language.includes(searchValue) ||
      username.includes(searchValue)
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

        <div className="sessions-page">

          {/* Heading */}
          <div className="sessions-heading">
            <div>
              <h1>Sessions Management</h1>
              <p>Manage and monitor all learning sessions.</p>
            </div>

            <button
              className="session-refresh"
              onClick={fetchSessions}
              disabled={loading}
            >
              <FiRefreshCw />
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="session-error">
              {error}
            </div>
          )}

          {/* Stats */}
          <div className="sessions-stats">

            <div className="session-stat-card">
              <div className="session-stat-icon">
                <FiBook />
              </div>

              <div>
                <p>Total Sessions</p>
                <h2>{sessions.length}</h2>
                <span>All learning sessions</span>
              </div>
            </div>

            <div className="session-stat-card">
              <div className="session-stat-icon green">
                <FiCalendar />
              </div>

              <div>
                <p>Showing Sessions</p>
                <h2>{filteredSessions.length}</h2>
                <span>Based on current search</span>
              </div>
            </div>

          </div>

          {/* Table */}
          <div className="sessions-table-container">

            <div className="sessions-table-header">
              <div>
                <h2>All Sessions</h2>
                <p>Complete list of learning sessions</p>
              </div>

              <div className="sessions-search">
                <FiSearch />

                <input
                  type="text"
                  placeholder="Search topic, language or user..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="sessions-table-wrapper">

              <table className="sessions-table">

                <thead>
                  <tr>
                    <th>SESSION</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>DURATION</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>

                  {loading ? (
                    <tr>
                      <td colSpan="5" className="session-empty">
                        Loading sessions...
                      </td>
                    </tr>

                  ) : filteredSessions.length > 0 ? (

                    filteredSessions.map((session) => (

                      <tr key={session._id}>

                        <td>
                          <div className="session-info">

                            <div className="session-avatar">
                              <FiBook />
                            </div>

                            <div>
                              <strong>
                                {session.topic || "Untitled Session"}
                              </strong>

                              <small>
                                {session.programmingLanguage || "N/A"}
                                {" · "}
                                ID: {session._id.slice(-8)}
                              </small>
                            </div>

                          </div>
                        </td>

                        <td>
                          <div className="session-user">
                            <FiUser />
                            {session.owner?.username || "Unknown User"}
                          </div>
                        </td>

                        <td>
                          <div className="session-date">
                            <FiCalendar />
                            N/A
                          </div>
                        </td>

                        <td>
                          <div className="session-duration">
                            <FiClock />
                            {session.duration ?? "N/A"}
                          </div>
                        </td>

                        <td>
                          <button
                            className="session-delete"
                            onClick={() => deleteSession(session._id)}
                          >
                            <FiTrash2 />
                            Delete
                          </button>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="5" className="session-empty">
                        No sessions found!
                      </td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            <div className="sessions-footer">
              Showing {filteredSessions.length} of {sessions.length} sessions
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminSessions;
