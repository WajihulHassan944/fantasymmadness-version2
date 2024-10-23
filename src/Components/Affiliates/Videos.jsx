import React, { useState, useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify'; // Make sure to import toast if you're using it for notifications

const Videos = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const videoRef = useRef(null);
  const [token, setToken] = useState(null); // State to temporarily store the token

  // Google Login Handler
  const handleGoogleSuccess = async (response) => {
    const { credential } = response;

    try {
      // Send the Google token to your backend API for verification and user handling
      const res = await fetch('https://fantasymmadness-game-server-three.vercel.app/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credential, // Send the token here
        }),
      });

      if (!res.ok) {
        throw new Error('Google login failed'); // Throw an error if response is not ok
      }

      const data = await res.json();
      console.log('Google login response:', data);

      // Only set the token in state if the response is valid
      if (data.token) {
        setToken(data.token); // Set the token state
        toast.success('Google login successful! 👌');
      } else {
        toast.error('No token returned from Google login.');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      toast.error('Error during Google login.');
    }
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    toast.error('Google Login Failed');
  };

  // Video Recording
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);

        const chunks = [];
        mediaRecorder.ondataavailable = (event) => chunks.push(event.data);

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(blob);
          setVideoBlob(blob);

          // Preview the recorded video
          videoRef.current.src = videoUrl;
          videoRef.current.controls = true;
        };

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(error => console.error('Error accessing media devices:', error));
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // YouTube Upload
  const uploadToYouTube = async () => {
    if (!token) {
      console.error('No access token available for upload');
      return;
    }

    try {
      const metadata = {
        snippet: {
          title: 'My Podcast Episode',
          description: 'This is a video podcast',
          tags: ['podcast', 'video', 'discussion'],
          categoryId: '22', // People & Blogs category
        },
        status: {
          privacyStatus: 'public', // Change to 'private' if needed
        },
      };

      const formData = new FormData();
      formData.append('video', videoBlob);
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));

      const response = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Video uploaded successfully:', data);
      alert(`Video uploaded successfully: https://www.youtube.com/watch?v=${data.id}`);
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Error uploading video.');
    }
  };

  return (
    <div>
      <h1>Record and Upload Podcast to YouTube</h1>

      {/* Google Login Component */}
      <GoogleLogin 
        onSuccess={handleGoogleSuccess} 
        onError={handleGoogleError}
      />

      <div>
        <video ref={videoRef} style={{ width: '400px', height: '300px' }} />
        <br />
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>

      {videoBlob && (
        <div>
          <button onClick={uploadToYouTube}>Upload to YouTube</button>
        </div>
      )}
    </div>
  );
};

export default Videos;
