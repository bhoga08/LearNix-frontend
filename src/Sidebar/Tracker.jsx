
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './tracker.css';
import './sidebar.css';
import Sidebar from '../pages/Sidebar';

const API = axios.create({
  baseURL: 'https://my-project-nsjg.onrender.com/api',
  withCredentials: true
});

const durationOptions = [
  { value: 15, title: 'Quick Session', description: '15 minutes' },
  { value: 30, title: 'Standard Session', description: '30 minutes' },
  { value: 45, title: 'Extended Session', description: '45 minutes' },
  { value: 60, title: 'Deep Session', description: '1 hour' }
];

const Tracker = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    programmingLanguage: '',
    topic: '',
    duration: 30
  });

  const [customDuration, setCustomDuration] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDurationSelect = (value) => {
    setCustomDuration(false);
    setFormData({
      ...formData,
      duration: value
    });
  };

  const handleCustomDuration = () => {
    setCustomDuration(true);
    setFormData({
      ...formData,
      duration: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const duration = Number(formData.duration);

    if (!Number.isInteger(duration) || duration < 1) {
      alert('Please enter a valid duration in minutes.');
      return;
    }

    try {
      setLoading(true);

      const res = await API.post('/v1/sessions/create', {
        ...formData,
        duration
      });

      alert('Session saved successfully!');

      setFormData({
        programmingLanguage: '',
        topic: '',
        duration: 30
      });

      setCustomDuration(false);

      navigate('/dashboard');

    } catch (error) {
      console.error(
        'Error saving session:',
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        'Failed to save session. Please login again.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />

      <div className="tracker-container">
        <h1 className="animated-heading">
          🧠 Track Your Study Session
        </h1>

        <form onSubmit={handleSubmit} className="tracker-form">

          <div className="form-group">
            <label>Programming Language</label>

            <select
              name="programmingLanguage"
              value={formData.programmingLanguage}
              onChange={handleChange}
              required
            >
              <option value="">Select Language</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
            </select>
          </div>

          <div className="form-group">
            <label>Topic</label>

            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              placeholder="E.g. Loops, OOP, Arrays"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Session Duration</label>

            <div className="duration-options">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    !customDuration &&
                    Number(formData.duration) === option.value
                      ? 'duration-card active'
                      : 'duration-card'
                  }
                  onClick={() => handleDurationSelect(option.value)}
                >
                  <strong>{option.value} min</strong>
                  <span>{option.title}</span>
                  <small>{option.description}</small>
                </button>
              ))}
            </div>

            <button
              type="button"
              className={
                customDuration
                  ? 'custom-duration-btn active'
                  : 'custom-duration-btn'
              }
              onClick={handleCustomDuration}
            >
              ✏️ Custom Duration
            </button>

            {customDuration && (
              <div className="custom-duration-input">
                <label>Enter Duration (Minutes)</label>

                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter minutes e.g. 90"
                  value={formData.duration}
                  onChange={handleChange}
                  name="duration"
                  required
                />

                <small>
                  Your session will be {formData.duration || 0} minutes long.
                </small>
              </div>
            )}

            {!customDuration && (
              <p className="duration-summary">
                Selected Duration: {formData.duration} minutes
              </p>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Saving Session...' : '💾 Save Session'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Tracker;
