import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UploadAvatar.css";
import Image from "../../Assets/logo.png";

const UploadAvatar = ({ email }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [buttonText, setButtonText] = useState('Browse');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setButtonText('Save');
    }
  };

  const handleSaveImage = async () => {
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('image', selectedImage); // Append the image file directly
        formData.append('email', email); // Append the email to the form data
        
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/upload-avatar', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Avatar uploaded successfully!');
          navigate('/login');
        } else {
          throw new Error('Failed to upload avatar');
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        alert('Failed to upload avatar');
      }
    }
  };

  return (
    <div className='uploadAvatar'>
      <h1>Registration Confirmed <br /> Upload your player image avatar below </h1>
      <img src={selectedImage ? URL.createObjectURL(selectedImage) : Image} alt="Player Avatar" />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="avatarInput"
        onChange={handleImageChange}
      />
      <button
        className='btn-grad'
        onClick={() => {
          if (buttonText === 'Browse') {
            document.getElementById('avatarInput').click();
          } else {
            handleSaveImage();
          }
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default UploadAvatar;
