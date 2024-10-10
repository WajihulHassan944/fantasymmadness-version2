import React, { useEffect, useRef } from 'react';
import BackgroundImg from "../../Assets/banner.png"; // Adjust the path as needed

const DynamicPromoImage = () => {
  const canvasRef = useRef(null);

  // Hardcoded data
  const imageData = {
    matchFighterA: "Michael Venom Page",
    matchFighterB: "Mike Perry",
    matchDate: "2024-09-17T00:00:00.000Z",
    matchTime: "10:35",
    maxRounds: 5,
    affiliateName: "Wajih uuul Hassan",
    usersInLeague: 500
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Create and load the background image
    const backgroundImage = new Image();
    backgroundImage.src = BackgroundImg; // Use the imported background image

    backgroundImage.onload = () => {
      // Draw background image once it has loaded
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      // Draw affiliate details
      ctx.font = '20px Arial';
      ctx.fillStyle = '#FFFFFF'; // Set text color to white
      ctx.fillText(`Affiliate: ${imageData.affiliateName}`, 20, 30); // Affiliate name
      ctx.fillText(`Users in League: ${imageData.usersInLeague}`, 20, 60); // Users in league

      // Add match details
      ctx.font = '25px Arial'; // Change font size for match details
      ctx.fillText(`${imageData.matchFighterA} vs ${imageData.matchFighterB}`, 150, 100); // Fighters
      ctx.fillText(`Date: ${new Date(imageData.matchDate).toLocaleDateString()}`, 150, 400); // Match date
      ctx.fillText(`Time: ${imageData.matchTime}`, 150, 430); // Match time
      ctx.fillText(`Max Rounds: ${imageData.maxRounds}`, 150, 460); // Max rounds
    };
  }, []); // No dependencies needed since we are using hardcoded data directly

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'promotional-image.png';
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={500} style={{ border: '1px solid #000', display:'none' }}></canvas>
      <button onClick={downloadImage} style={{marginTop:'200px'}}>Download Image</button>
    </div>
  );
};

export default DynamicPromoImage;
