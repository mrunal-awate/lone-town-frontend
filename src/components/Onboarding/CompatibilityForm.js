// src/components/Onboarding/CompatibilityForm.js
import React, { useState } from 'react';

const questions = [
  { key: 'introvert_extrovert', label: 'Are you more introverted or extroverted?', options: ['Introverted', 'Extroverted', 'Balanced'] },
  { key: 'conflict_style', label: 'How do you handle conflict?', options: ['Avoid it', 'Face it directly', 'Try to compromise'] },
  { key: 'relationship_goal', label: 'What’s your relationship goal?', options: ['Casual', 'Serious', 'Long-term'] },
  { key: 'love_language', label: 'What’s your love language?', options: ['Words', 'Time', 'Gifts', 'Acts', 'Touch'] },
  { key: 'attachment_style', label: 'What’s your attachment style?', options: ['Secure', 'Anxious', 'Avoidant', 'Fearful'] }
];

function CompatibilityForm({ onSubmit }) {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [questions[step].key]: e.target.value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  const current = questions[step];

  return (
    <div>
      <h3>{current.label}</h3>
      {current.options.map((opt) => (
        <div key={opt}>
          <input
            type="radio"
            name={current.key}
            value={opt}
            onChange={handleChange}
            checked={formData[current.key] === opt}
          />
          <label>{opt}</label>
        </div>
      ))}
      <br />
      <button onClick={handleNext}>
        {step === questions.length - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  );
}

export default CompatibilityForm;
