
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import MatchScreen from './pages/MatchScreen';
import Chat from './pages/Chat';
import Feedback from './pages/Feedback';
import VideoCall from './pages/VideoCall';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/match" element={<MatchScreen />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/video" element={<VideoCall />} />
      </Routes>
    </Router>
  );
}

export default App;










// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
