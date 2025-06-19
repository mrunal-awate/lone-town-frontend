import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // backend URL

function Chat() {
  const location = useLocation();
  const navigate = useNavigate();
  const matchId = location.state?.matchId;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [videoUnlocked, setVideoUnlocked] = useState(false);
  const sender = 'You';

  useEffect(() => {
    if (matchId) {
      socket.emit('joinRoom', matchId);

      fetch(`http://localhost:5000/api/messages/${matchId}`)
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error('❌ Failed to load messages:', err));

      fetch(`http://localhost:5000/api/messages/unlock/${matchId}`)
        .then(res => res.json())
        .then(data => {
          if (data.eligible) {
            setVideoUnlocked(true);
          }
        })
        .catch(err => console.error('❌ Failed to check video unlock:', err));

      socket.on('receiveMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      socket.off('receiveMessage');
    };
  }, [matchId]);

  const handleSend = () => {
    if (text.trim() !== '') {
      socket.emit('sendMessage', { matchId, sender, text });
      setText('');
    }
  };

  const handleStartCall = () => {
    navigate('/video', { state: { matchId } });
  };

  return (
    <div>
      <h2>💬 Chat Room</h2>

      <div style={{ border: '1px solid #ccc', padding: '1rem', maxHeight: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>{msg.text}
            <small> ({new Date(msg.timestamp).toLocaleTimeString()})</small>
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>

      {/* ✅ Message Progress Section */}
      <div style={{ marginTop: '1rem' }}>
        <p>📈 {messages.length} / 100 messages</p>
        <progress value={messages.length} max="100" style={{ width: '100%' }} />
      </div>

      {/* ✅ Video Call Section */}
      <div style={{ marginTop: '1rem' }}>
        {videoUnlocked ? (
          <button onClick={handleStartCall}>🎥 Start Video Call</button>
        ) : (
          <p>🔒 Video call unlocks after 100 messages in 48 hours.</p>
        )}
      </div>
    </div>
  );
}

export default Chat;
