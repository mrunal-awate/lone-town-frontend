import React from 'react';
import { useLocation } from 'react-router-dom';

function Feedback() {
  const location = useLocation();
  const userAnswers = location.state?.userAnswers;
  const matchAnswers = location.state?.matchAnswers;

  const reasonMap = {
    introvert_extrovert: "You both have different social energy levels (introvert vs extrovert).",
    conflict_style: "You handle conflicts differently — that could lead to tension.",
    relationship_goal: "You’re looking for different relationship goals.",
    love_language: "Your love languages don’t align — this could cause unmet needs.",
    attachment_style: "You may have incompatible attachment styles."
  };

  const mismatches = [];

  if (userAnswers && matchAnswers) {
    for (const key in userAnswers) {
      if (userAnswers[key] !== matchAnswers[key]) {
        mismatches.push(reasonMap[key]);
      }
    }
  }

  const finalReason = mismatches.length
    ? mismatches[0] // show the first mismatch reason
    : "You had a lot in common, but sometimes timing just isn’t right.";

  return (
    <div>
      <h2>🧠 Reflection Feedback</h2>
      <p>{finalReason}</p>
      <p>Remember: every connection teaches you something valuable 💡</p>
    </div>
  );
}

export default Feedback;
