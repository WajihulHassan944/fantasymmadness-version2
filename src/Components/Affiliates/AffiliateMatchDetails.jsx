import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef }  from 'react';
import FightLeaderboard from '../GlobalLeaderboard/FightLeaderboard';
import AffiliateFightLeaderboard from './AffiliateFightLeaderboard';
import { fetchMatches } from '../../Redux/matchSlice';
import BackgroundImg from "../../Assets/imgone.png";
const AffiliateMatchDetails = ({ matchId, affiliateId }) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const match = matches.find((m) => m.shadowFightId === matchId && m.affiliateId === affiliateId);
  const [navigateDashboard, setNavigateToDash] = useState(null);
  
  const imageData = {
    logoImage: "https://fantasymmadness.com/static/media/logo.c2aa609dbe0ed6c1af42.png"
  };

  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);

  useEffect(() => {
    if (!match) return; // Exit if match is not available yet

    const canvas = canvasRef.current;
    if (!canvas) return; // Check if canvas is available
    const ctx = canvas.getContext('2d');

    const backgroundImage = new Image();
    backgroundImage.src = BackgroundImg;

    const fighterOneImage = new Image();
    fighterOneImage.crossOrigin = "anonymous";
    fighterOneImage.src = match.fighterAImage;

    const fighterTwoImage = new Image();
    fighterTwoImage.crossOrigin = "anonymous";
    fighterTwoImage.src = match.fighterBImage;

    const logoImage = new Image();
    logoImage.crossOrigin = "anonymous";
    logoImage.src = imageData.logoImage;

    let imagesLoaded = 0;
    const handleImageLoad = () => {
      imagesLoaded += 1;
      if (imagesLoaded === 4) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(logoImage, 10, 10, 60, 60);

        // Updated text position and order
        ctx.font = 'bold 18px UFCSans, Arial, sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';

        ctx.fillText(`${match.matchName}`, canvas.width / 2, 40); // Moved up

        // Change date and time color to match box shadow color
        ctx.fillStyle = '#FF4500'; 
        ctx.fillText(`${new Date(match.matchDate).toLocaleDateString()} ${match.matchTime}`, canvas.width / 2, 65); // Date and time below promoter name
        
        const drawImageWithShadow = (image, x, y, name) => {
          const radius = 35; // Circle radius
          
          // Save current state
          ctx.save();
          
          // Begin circular clipping path
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2); // Maintain circular shape (35 radius)
          ctx.closePath();
          ctx.clip();
          
          // Light box shadow effect
          ctx.shadowColor = 'rgba(255, 69, 0, 0.3)'; // Lighter shadow color with transparency
          ctx.shadowBlur = 10; // Reduced blur for a subtle effect
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          
          // Set the image to fill 100% of the circle (stretched)
          const circleDiameter = radius * 2;
          ctx.drawImage(image, x - radius, y - radius, circleDiameter, circleDiameter);
          
          // Restore previous state
          ctx.restore();
          
          // Render fighter name below image with gap
          ctx.font = 'bold 16px UFCSans, Arial, sans-serif';
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(name, x, y + radius + 25); // Position name below the image
        };
        
        // Call function for fighter images
        drawImageWithShadow(fighterOneImage, 140, 140, match.matchFighterA);
        drawImageWithShadow(fighterTwoImage, 350, 140, match.matchFighterB);
                
        // URL at bottom
        ctx.fillText('https://fantasymmadness.com', canvas.width / 2, 270); 
      }
    };

    backgroundImage.onload = handleImageLoad;
    fighterOneImage.onload = handleImageLoad;
    fighterTwoImage.onload = handleImageLoad;
    logoImage.onload = handleImageLoad;

  }, [match]); // Add match to dependencies to rerun when it changes

  if (!match) {
    return <p>Loading...</p>;
  }
  
  if (!affiliate) {
    return <div>Loading...</div>;
  }

  const handleDeleteFight = async (id) => {
    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/api/matches/${id}?affiliateId=${affiliateId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        alert("Promotion Deleted");
        window.location.reload();
      } else {
        console.error('Failed to delete:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };
  
  const handleDashboardOpening = (id) => {
    setNavigateToDash(id);
  };

  if (navigateDashboard) {
    return <AffiliateFightLeaderboard matchId={navigateDashboard} />;
  }

  const copyToClipboard = () => {
    if (match && affiliate) {
      const fullName = `${affiliate.firstName} ${affiliate.lastName}`; // Combine first and last name
      const encodedMatchName = encodeURIComponent(match.matchName);  // Encode matchName
      const encodedFullName = encodeURIComponent(fullName);  // Encode fullName
      
      const url = `https://fantasymmadness.com/shadow/${encodedMatchName}/${encodedFullName}`;
      
      navigator.clipboard.writeText(url)
        .then(() => {
          alert("URL copied to clipboard!");
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'promotional-image.png';
    link.click();
  };

  return (
    <div className='fightDetails' style={{ paddingBottom: '50px' }}>
      <div className='member-header' style={{ marginBottom: '30px' }}>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Logo" />
        </div>
        <h3>Affiliate <span className="toRemove">Name </span>- {affiliate.firstName} {affiliate.lastName}</h3>
        <h3>Users <span className="toRemove"> in my League</span> : {affiliate.usersJoined.length}</h3>
      </div>

      <div className='fightDetailsContainer'>
        <h1 className='fightDetailsContainerFirstHeading'>Fight: <span>{match.matchName}</span></h1>
        <div className='fightersImagesInFightDetails'>
          <div className='imgWrapFights'>
            <img src={match.fighterAImage} alt="Fighter A" />
          </div>
          <h1>VS</h1>
          <div className='imgWrapFights'>
            <img src={match.fighterBImage} alt="Fighter B" />
          </div>
        </div>

        <div className='fightDetailsPot'>
          <h1 style={{ background: '#e90000', padding: '5px 10px', fontSize: '22px' }}>This fight is approved.</h1>
        </div>

        <h1 className='fightTypeInFightDetails' style={{ fontSize: '21.5px' }}>
          Fight type: <span>{match.matchCategoryTwo ? match.matchCategoryTwo : match.matchCategory}</span>
          - <span style={{ color: '#3fd50b' }}>{match.matchType} </span> - <span>{match.matchFighterA} </span> VS <span> {match.matchFighterB} </span>
        </h1>

        <div className='fightDetailsPot'>
          <h1>POT :</h1>
          <p style={{ color: "#38b90c" }}>{match.pot} </p>
        </div>

        <div className='beiginningTimeFight'>
          <h1 style={{ fontSize: '21.5px' }}>{new Date(match.matchDate).toLocaleDateString()} - </h1>
          <p style={{ color: "#38b90c" }}>{match.matchTime}</p>
        </div>

        <div className='fightDetailsPot'>
          <h1 style={{ fontSize: '21.5px' }}>Fight promotion url below <span onClick={copyToClipboard} style={{ cursor: 'pointer', color: 'blue' }}>Click to copy</span></h1>
        </div>
        <div className='fightDetailsPot'>
          <h1 style={{ color: '#8abafe', fontSize: '21.5px' }} className='specialtextmine'>fantasymmadness.com/shadow/{match.matchName}/{affiliate.firstName} {affiliate.lastName}</h1>
        </div>

        <div style={{ width: '100%', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <button className='btn-grad promobtn' onClick={() => handleDeleteFight(match._id)}>Delete Fight</button>
          <button className='btn-grad promobtn' onClick={() => handleDashboardOpening(match._id)}>Dashboard</button>
        </div>

        <canvas ref={canvasRef} width={500} height={300} style={{ border: '1px solid #000', marginTop: '100px' }}></canvas>
        <button onClick={downloadImage} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#FF4500', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Download Image</button>
      </div>
    </div>
  );
};

export default AffiliateMatchDetails;
