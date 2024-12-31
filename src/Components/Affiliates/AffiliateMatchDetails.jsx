import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef }  from 'react';
import AffiliateFightLeaderboard from './AffiliateFightLeaderboard';
import { fetchMatches } from '../../Redux/matchSlice';
import QRCode from 'qrcode'; 
import "./AffiliateMatchDetailsCss.css";
import { ReactMediaRecorder } from 'react-media-recorder';
import s3 from "../Config/s3Config"; // Importing the configured S3 instance
import { toast } from 'react-toastify';
import "../Dashboard/FightDetails.css"
import { stopMusic, playMusic } from '../../Redux/musicSlice';




const AffiliateMatchDetails = ({ matchId, affiliateId }) => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  const match = matches.find((m) => m.shadowFightId === matchId && m.affiliateId === affiliateId);
  const [navigateDashboard, setNavigateToDash] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 const [isOpenPodcast, setOpenPodcast] = useState(false);
 const [isRecording, setIsRecording] = useState(false);
 
  const imageData = {
    logoImage: "https://www.fantasymmadness.com/static/media/logo.c2aa609dbe0ed6c1af42.png"
  };
  const [backgroundImgVar, setBackgroundImgVar] = useState("https://i.ibb.co/sWZ5QFh/imgone.png");
  
  useEffect(() => {
    // Update background image state based on match data
    if (match && match.promotionBackground) {
        setBackgroundImgVar(match.promotionBackground);
       } 
}, [match]);


  useEffect(() => {
    dispatch(stopMusic());
   
    return () => dispatch(playMusic());
}, [matchId,  dispatch]);


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

    // Initialize images
    const backgroundImage = new Image();
    backgroundImage.crossOrigin = "anonymous";
    backgroundImage.src = backgroundImgVar;

    const logoImage = new Image();
    logoImage.crossOrigin = "anonymous";
    logoImage.src = imageData.logoImage;

    const fighterOneImage = new Image();
    fighterOneImage.crossOrigin = "anonymous";
    fighterOneImage.src = match.fighterAImage;

    const fighterTwoImage = new Image();
    fighterTwoImage.crossOrigin = "anonymous";
    fighterTwoImage.src = match.fighterBImage;

    let imagesLoaded = 0;
    const totalImages = match.promotionBackground ? 2 : 4; // Adjust based on rendering flow

    const handleImageLoad = () => {
        imagesLoaded += 1;
        if (imagesLoaded === totalImages) {
            // Draw background image
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            if (match.promotionBackground) {
                // Apply dark overlay for custom background
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw logo
                ctx.drawImage(logoImage, 10, 10, 60, 60);

                // Generate QR code
                const fullName = `${affiliate.firstName} ${affiliate.lastName}`;
                const encodedMatchName = encodeURIComponent(match.matchName);
                const encodedFullName = encodeURIComponent(fullName);
                const url = `https://fantasymmadness.com/shadow/${encodedMatchName}/${encodedFullName}`;

                QRCode.toDataURL(url, { width: 60, margin: 2 }, (err, qrImageUrl) => {
                    if (!err) {
                        const qrImage = new Image();
                        qrImage.src = qrImageUrl;
                        qrImage.onload = () => {
                            ctx.drawImage(qrImage, (canvas.width / 2) - 30, 225, 60, 60); // Center QR code below URL
                        };
                    }
                });
            } else {
                // Render all elements when no custom background
                ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw logo
                ctx.drawImage(logoImage, 10, 10, 60, 60);

                // Draw text for website URL
                ctx.font = 'bold 18px UFCSans, Arial, sans-serif';
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.fillText(`fantasymmadness.com`, canvas.width / 2, 40);

                // Draw date and time
                ctx.fillStyle = '#FF4500';
                ctx.fillText(
                    `${match.matchDate.split('T')[0]} ${new Date(`1970-01-01T${match.matchTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`,
                    canvas.width / 2, 65
                );

                // Draw fighters with shadow effect
                const drawImageWithShadow = (image, x, y, name) => {
                    const radius = 45;

                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();

                    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                    ctx.shadowBlur = 0;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;

                    const circleDiameter = radius * 2;
                    ctx.drawImage(image, x - radius, y - radius, circleDiameter * 1.2, circleDiameter);

                    ctx.restore();

                    ctx.font = 'bold 16px UFCSans, Arial, sans-serif';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillText(name, x, y + radius + 25);
                };

                drawImageWithShadow(fighterOneImage, 110, 140, match.matchFighterA);
                drawImageWithShadow(fighterTwoImage, 380, 140, match.matchFighterB);

                // Generate QR code
                const fullName = `${affiliate.firstName} ${affiliate.lastName}`;
                const encodedMatchName = encodeURIComponent(match.matchName);
                const encodedFullName = encodeURIComponent(fullName);
                const url = `https://fantasymmadness.com/shadow/${encodedMatchName}/${encodedFullName}`;

                QRCode.toDataURL(url, { width: 60, margin: 2 }, (err, qrImageUrl) => {
                    if (!err) {
                        const qrImage = new Image();
                        qrImage.src = qrImageUrl;
                        qrImage.onload = () => {
                            ctx.drawImage(qrImage, (canvas.width / 2) - 30, 225, 60, 60);
                        };
                    }
                });
            }
        }
    };

    // Attach onload events
    backgroundImage.onload = handleImageLoad;
    logoImage.onload = handleImageLoad;

    if (!match.promotionBackground) {
        fighterOneImage.onload = handleImageLoad;
        fighterTwoImage.onload = handleImageLoad;
    }
}, [match, affiliate, backgroundImgVar]);

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
    return (
      <>
        <i
          className="fa fa-arrow-circle-left dashboard-arrow-circle"
          aria-hidden="true"
          onClick={() => setNavigateToDash(null)} // Go back to the previous component
        ></i>
        <AffiliateFightLeaderboard matchId={navigateDashboard} />
      </>
    );
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

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  
  const openPodcastRecorder = () => {
    setOpenPodcast(true);
  };
  

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'promotional-image.png';
    link.click();
  };

  const handleSave = async (blobUrl) => {
    const fileName = `${Date.now()}.mp4`;
  
    // Create a promise for the upload process
    const uploadPromise = new Promise(async (resolve, reject) => {
      try {
        // Fetch the blob data from blobUrl
        const response = await fetch(blobUrl);
        const blob = await response.blob();
  
        const params = {
          Bucket: 'promotionsvideos',
          Key: fileName,
          Body: blob,
          ContentType: 'video/mp4'
        };
  
        // Upload video to S3
        s3.upload(params, (err, data) => {
          if (err) {
            console.error('Upload Error', err);
            reject(new Error('Upload failed. Please try again.'));
          } else {
            saveVideoUrlToDatabase(data.Location);
            resolve(); // Resolve on successful upload
          }
        });
      } catch (error) {
        console.error('Error fetching blob:', error);
        reject(new Error('Failed to fetch video data.'));
      }
    });
  
    // Use toast.promise to handle pending, success, and error states
    toast.promise(uploadPromise, {
      pending: 'Uploading video...',
      success: 'Upload successful! 🎉',
      error: {
        render({ data }) {
          return data.message || 'Upload failed. Please try again.';
        }
      }
    });
  };
  
  
  const saveVideoUrlToDatabase = (videoUrl) => {
    fetch(`https://fantasymmadness-game-server-three.vercel.app/api/matches/${match._id}/promotional-video`, {
      method: 'POST', // Change to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ promotionalVideoUrl: videoUrl }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log('Video URL saved:', data);
          window.location.reload();
        } else {
          alert('Failed to update video URL');
        }
      })
      .catch((error) => console.error('Error saving video URL:', error));
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
            <img src={match.fighterBImage} alt="Fighter B" onClick={()=> alert(match.fighterBImage)} />
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

  {/*       <div className='beiginningTimeFight'>
        <h1 style={{ fontSize: '21.5px' }}>{match.matchDate.split('T')[0]} - </h1>
        <p style={{ color: "#38b90c" }}>
  {new Date(`1970-01-01T${match.matchTime}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
</p>
 </div>  */}

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

        <canvas 
  ref={canvasRef} 
  width={500} 
  height={300} 
  style={{ 
    border: '1px solid #000', 
    marginTop: '70px', 
    width: '100%', // Make the width responsive
    maxWidth: '500px', // Set the maximum width to avoid stretching too much
    height: 'auto' // Maintain aspect ratio
  }}
></canvas>

<div style={{display:'flex',gap:'10px'}}>
        <button onClick={downloadImage} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#FF4500', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>Download Image</button>
        <button  onClick={openModal} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#FF4500', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>View Instructions</button>
     
        {!match.matchPromotionalVideoUrl && (
  <button 
    onClick={() => {
      openPodcastRecorder(); 
      window.scrollBy({ top: 400, behavior: 'smooth' });
    }} 
    style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#FF4500', color: '#FFF', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
  >
    Record a podcast
  </button>
)}
   </div>  
       
        {isModalOpen && (
  <div className="modal-overlay-instructions">
    <div className="modal-content">
      <h2>Event Instructions</h2>
      <p>Follow these steps to maximize your promotion:</p>
      <ul className="instruction-list">
        <li>🌟 <strong>Step 1:</strong> Download the promotional image.</li>
        <li>🌐 <strong>Step 2:</strong> Share it on your social networks.</li>
        <li>📱 <strong>Step 3:</strong> Let users scan the QR code to access the promotion.</li>
        <li>🎉 <strong>Step 4:</strong> Enjoy welcoming new members!</li>
      </ul>
      <button className="close-btn" onClick={closeModal}>Close</button>
    </div>
  </div>
)}
{isOpenPodcast && (
  <ReactMediaRecorder
    video
    render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
      <div className="videoRecorderContainer">
        <p className="statusText" style={{color:'#fff'}}>Status: {status}</p>
        
        {/* Live preview video element */}
        <video 
          className="liveVideo" 
          ref={(video) => {
            if (video && previewStream) {
              video.srcObject = previewStream; // Correctly setting srcObject for the live preview
            }
          }} 
          autoPlay 
          muted 
          playsInline
        />
        
        {/* Video element to show recorded video after stopping */}
        {mediaBlobUrl && (
          <video className="recordedVideo" src={mediaBlobUrl} controls />
        )}
        
        <div className="buttonContainer">
        
<button
  className="recordButton"
  onClick={() => {
    setIsRecording(true); // Disable Start button
    startRecording();
  }}
  disabled={isRecording} // Disable Start button after clicking
  style={{ pointerEvents: isRecording ? 'none' : 'auto' }}
>
  Start Recording
</button>

<button
  className="stopButton"
  onClick={() => {
    setIsRecording(false); // Re-enable Start button
    stopRecording();
  }}
  disabled={!isRecording} // Initially disabled, enabled when recording
>
  Stop Recording
</button>

<button
  className="saveButton"
  onClick={() => handleSave(mediaBlobUrl)}
  disabled={!mediaBlobUrl} // Enable only if mediaBlobUrl exists
>
  Save Video
</button></div>
      </div>
    )}
  />
)}


{match.matchPromotionalVideoUrl && (
  <div className="videoContainer">
    <video className="responsiveVideo" controls>
      <source src={match.matchPromotionalVideoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
)}


         </div>
    </div>
  );
};

export default AffiliateMatchDetails;
