import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// ✅ Replace this with your live backend URL
const API_BASE = "https://lone-town-backend.onrender.com";

function MatchScreen() {
  const [match, setMatch] = useState(null);
  const [isFrozen, setIsFrozen] = useState(false);
  const [freezeCountdown, setFreezeCountdown] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  useEffect(() => {
    if (userId) {
      axios
        .get(`${API_BASE}/api/users/match/${userId}`)
        .then((res) => setMatch(res.data.match))
        .catch((err) => {
          const errorMsg = err.response?.data?.error;
          if (errorMsg && errorMsg.includes("not available")) {
            setIsFrozen(true);

            // ⏳ Fetch freezeUntil time
            axios
              .get(`${API_BASE}/api/users/${userId}`)
              .then((res) => {
                const freezeUntil = new Date(res.data.freezeUntil);
                if (!freezeUntil) return;

                const interval = setInterval(() => {
                  const now = new Date();
                  const diff = freezeUntil - now;

                  if (diff <= 0) {
                    setFreezeCountdown("✅ You can now be matched again!");
                    clearInterval(interval);
                  } else {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor(
                      (diff % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    setFreezeCountdown(
                      `🕒 You’re frozen for ${hours}h ${minutes}m more`
                    );
                  }
                }, 1000);
              });
          } else {
            console.error("Match error:", err);
          }
        });
    }
  }, [userId]);

  const goToChat = () => {
    navigate("/chat", { state: { matchId: match._id } });
  };

  const handleUnpin = async () => {
    try {
      // 1️⃣ Get current user's answers
      const userRes = await fetch(`${API_BASE}/api/users/${userId}`);
      const userData = await userRes.json();
      const userAnswers = userData.compatibilityAnswers;

      // 2️⃣ Unpin the match
      const res = await fetch(`${API_BASE}/api/users/unpin/${userId}`, {
        method: "POST",
      });
      const data = await res.json();
      alert(data.message);

      // 3️⃣ Navigate to feedback with answers
      navigate("/feedback", {
        state: {
          userAnswers: userAnswers,
          matchAnswers: match?.compatibilityAnswers || {},
        },
      });
    } catch (err) {
      alert("❌ Failed to unpin match.");
      console.error(err);
    }
  };

  if (!userId) {
    return <p>❌ User ID not provided. Go back and onboard first.</p>;
  }

  return (
    <div>
      <h2>🎯 Your Daily Match</h2>

      {isFrozen ? (
        <p>
          {freezeCountdown || "🕒 You are in a reflection or cooldown period."}
        </p>
      ) : match ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginTop: "1rem",
          }}
        >
          <p>
            <strong>Love Language:</strong>{" "}
            {match.compatibilityAnswers.love_language}
          </p>
          <p>
            <strong>Conflict Style:</strong>{" "}
            {match.compatibilityAnswers.conflict_style}
          </p>
          <p>
            <strong>Attachment Style:</strong>{" "}
            {match.compatibilityAnswers.attachment_style}
          </p>
          <p>
            <strong>Relationship Goal:</strong>{" "}
            {match.compatibilityAnswers.relationship_goal}
          </p>
          <p>
            <strong>Personality:</strong>{" "}
            {match.compatibilityAnswers.introvert_extrovert}
          </p>

          <button onClick={goToChat} style={{ marginRight: "1rem" }}>
            💬 Start Chat
          </button>
          <button onClick={handleUnpin}>❌ Unpin Match</button>
        </div>
      ) : (
        <p>
          🔄 Looking for your best match...
          <br />
          If this takes long, you might be the only available user right now.
        </p>
      )}
    </div>
  );
}

export default MatchScreen;
