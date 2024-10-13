import React, { useEffect, useRef } from 'react';
import BackgroundImg from "../../Assets/boxing-victory.png"; // Adjust the path as needed

const DynamicPromoImage = () => {
  const canvasRef = useRef(null);

  // Hardcoded data including the external image URLs
  const imageData = {
    matchFighterA: "Michael Venom Page",
    matchFighterB: "Mike Perry",
    matchDate: "2024-09-17T00:00:00.000Z",
    matchTime: "10:35",
    maxRounds: 5,
    affiliateName: "Wajih uuul Hassan",
    usersInLeague: 500,
    fighterAImage: "https://i.ibb.co/mb8ZH7L/f2b08a202923.jpg",
    fighterBImage: "https://i.ibb.co/6D7QNHw/758447972263.jpg"
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Create and load the background image
    const backgroundImage = new Image();
    backgroundImage.src = BackgroundImg; // Use the imported background image

    // Set crossOrigin attribute to handle CORS for external images
    const fighterOneImage = new Image();
    fighterOneImage.crossOrigin = "anonymous"; // Enable cross-origin for fighter A image
    fighterOneImage.src = imageData.fighterAImage; // Use the URL for fighter A image

    const fighterTwoImage = new Image();
    fighterTwoImage.crossOrigin = "anonymous"; // Enable cross-origin for fighter B image
    fighterTwoImage.src = imageData.fighterBImage; // Use the URL for fighter B image

    // Ensure both images are loaded before rendering
    let imagesLoaded = 0;
    const handleImageLoad = () => {
      imagesLoaded += 1;
      if (imagesLoaded === 3) {
        // Draw background and other details once all images are loaded
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Draw affiliate details
        ctx.font = '20px Arial';
        ctx.fillStyle = '#FFFFFF'; // Set text color to white
        ctx.fillText(`Affiliate: ${imageData.affiliateName}`, 20, 30); // Affiliate name
        ctx.fillText(`Users in League: ${imageData.usersInLeague}`, 20, 60); // Users in league

        // Add match details
        ctx.font = '25px sans-serif'; // Change font size for match details
        ctx.fillText(`${imageData.matchFighterA} vs ${imageData.matchFighterB}`, 150, 100); // Fighters
        ctx.fillText(`Date: ${new Date(imageData.matchDate).toLocaleDateString()}`, 150, 400); // Match date
        ctx.fillText(`Time: ${imageData.matchTime}`, 150, 430); // Match time
        ctx.fillText(`Max Rounds: ${imageData.maxRounds}`, 150, 460); // Max rounds

        // Draw fighter images
        ctx.drawImage(fighterOneImage, 50, 150, 100, 150); // Fighter 1 position (x, y, width, height)
        ctx.drawImage(fighterTwoImage, 450, 150, 100, 150); // Fighter 2 position (x, y, width, height)
      }
    };

    // Listen for images to load
    backgroundImage.onload = handleImageLoad;
    fighterOneImage.onload = handleImageLoad;
    fighterTwoImage.onload = handleImageLoad;
  }, []); // No dependencies needed since we are using hardcoded data directly

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png'); // Export the canvas as a PNG image
    const link = document.createElement('a');
    link.href = image;
    link.download = 'promotional-image.png';
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={500} style={{ border: '1px solid #000', marginTop:'100px' }}></canvas>
      <button onClick={downloadImage} style={{ marginTop: '20px' }}>Download Image</button>
    </div>
  );
};

export default DynamicPromoImage;
