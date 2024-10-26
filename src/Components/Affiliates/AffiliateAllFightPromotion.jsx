import React from 'react';
import { useSelector } from 'react-redux';
import "./affiliateprofile.css";
import { useNavigate } from 'react-router-dom';

const AffiliateAllFightPromotion = () => {
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
const navigate = useNavigate();
  if (!affiliate) {
    return <div>Loading...</div>;
  }

  const promoUrl = `https://fantasymmadness.com/affiliate/${encodeURIComponent(affiliate.firstName)}%20${encodeURIComponent(affiliate.lastName)}`;

  // Copy URL to clipboard
  const handleCopyClick = () => {
    navigator.clipboard.writeText(promoUrl)
      .then(() => {
        alert('Promotion URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
      });
  };

  return (
    <div className='myprofile allpromotion'>
     <i
        className="fa fa-arrow-circle-left dashboard-arrow-circle"
        aria-hidden="true"
        onClick={() => navigate(-1)} // Go back to the previous page
      ></i>
   
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={affiliate.profileUrl} alt="Profile" />
        </div>
        <h3><span className='toRemove'>Affiliate Name - </span>{affiliate.firstName} {affiliate.lastName}</h3>
        <h3>Users <span className="toRemove"> in my League</span> : {affiliate.usersJoined.length}</h3>
      </div>

      <div className='allContainer'>
        <h1>Your All Fights Promotion URL <span onClick={handleCopyClick} style={{ cursor: 'pointer', color: 'blue' }}>Click To Copy</span></h1>
        <h2>https://fantasymmadness.com/affiliate/{affiliate.firstName} {affiliate.lastName}</h2>
      </div>
    </div>
  );
};

export default AffiliateAllFightPromotion;
