// src/pages/Onboarding.js
import React from 'react';
import CompatibilityForm from '../components/Onboarding/CompatibilityForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ✅ Use centralized API base
const API_BASE = 'https://lone-town-backend.onrender.com';

function Onboarding() {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_BASE}/api/users/register`, data);
      console.log('✅ User saved:', res.data);
      navigate('/match', { state: { userId: res.data._id } });
    } catch (err) {
      console.error('❌ Registration failed:', err);
      alert('Failed to register user. Try again.');
    }
  };

  return (
    <div>
      <h1>Welcome to Lone Town</h1>
      <p>Answer a few mindful questions to get your daily match.</p>
      <CompatibilityForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default Onboarding;
