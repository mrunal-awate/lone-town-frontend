// src/pages/Onboarding.js
import React from 'react';
import CompatibilityForm from '../components/Onboarding/CompatibilityForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // <- make sure this is imported

function Onboarding() {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', data);
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
