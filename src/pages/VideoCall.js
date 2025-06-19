import React, { useEffect } from 'react';

function VideoCall() {
  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'LoneTown_' + Date.now(), // Generate a unique room name
      width: '100%',
      height: 600,
      parentNode: document.getElementById('jitsi-container'),
      userInfo: { displayName: 'Lone Town User' }
    };
    new window.JitsiMeetExternalAPI(domain, options);
  }, []);

  return (
    <div>
      <h2>🎥 Lone Town Video Call</h2>
      <div id="jitsi-container" style={{ width: '100%', height: '600px' }} />
    </div>
  );
}

export default VideoCall;
