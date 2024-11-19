import React,{ useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TrackClick = () => {
  const [isTracked, setIsTracked] = useState(false);
  useEffect(() => {
    if (!isTracked) {
      // Check if the user has a unique device ID
      let deviceId = localStorage.getItem('deviceId');
      if (!deviceId) {
        // Generate a new UUID and store it in localStorage
        deviceId = uuidv4();
        localStorage.setItem('deviceId', deviceId);
      }

      // Check if the visit has already been tracked in this session
      const hasVisitedThisSession = sessionStorage.getItem('hasVisitedThisSession');

      if (!hasVisitedThisSession) {
        // Make a POST request to track the visit with the device ID
        fetch('https://fantasymmadness-game-server-three.vercel.app/track-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deviceId }), // Include the device ID in the payload
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Visitor count updated:', data.totalClicks);
          })
          .catch((err) => console.error('Error tracking click:', err));

        // Mark the visit as tracked in this session
        sessionStorage.setItem('hasVisitedThisSession', 'true');
      }

      // Prevent further tracking
      setIsTracked(true);
    }
  }, [isTracked]);

  return null; // No UI needed
};

export default TrackClick;
