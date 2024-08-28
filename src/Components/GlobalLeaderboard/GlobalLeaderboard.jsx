import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./GlobalLeaderboard.css";
import FighterOne from "../../Assets/fighterOne.png";
import Logoimage from "../../Assets/myimg.jpg";
import useLeaderboardData from '../../CustomFunctions/useLeaderboardData';

const GlobalLeaderboard = () => {
  
  const matches = useSelector((state) => state.matches.data);
  const { leaderboard, playerCount } = useLeaderboardData(matches);

  const userLoggedIn = useSelector((state) => state.user); // Access user details from Redux store

  
  const renderLeaderboardItems = () => {
    if (leaderboard.length === 0) {
      return <p className='noMatch'>No leaderboard items available at the moment.</p>;
    }
  
    return leaderboard.map((user, index) => (
      <div className='leaderboardItem' key={user._id}>
        <div className='leaderboard-item-image'>
          <img src={user.profileUrl || FighterOne} alt={user.firstName} />
        </div>
        <h1>{user.firstName} <span className='toRemove'>{user.lastName}</span></h1>
        <h1 className='toRemove'>RW#</h1>
        <h1 className='toRemove'>KO#</h1>
        <h1>Points {user.totalPoints}</h1>
        <h1>#{index + 1}</h1>
      </div>
    ));
  };


  
  return (
    <div className='fightDetails global-leaderboard'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={userLoggedIn.profileUrl} alt="Logo" />
        </div>
        <h3><span className='toRemove'>Member Name - </span>{userLoggedIn.firstName} {userLoggedIn.lastName}</h3>
        <h3><span className='toRemove'>Current </span>Plan: None</h3>
      </div>

      <div className='fightwalletWrap'>
        <div className='fightWallet'>
          <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
          <h2>Tokens Remaining: <span>35</span></h2>
        </div>
      </div>

      <div className='homeThird'>
        <h1 className='thirdHeadingOne'>Global Leader Board</h1>
        <h2>Players - <span>{playerCount}</span></h2>

        <div className='leaderboardHeading'><h3>Leaderboard</h3></div>
        <div className='controls'>
          <h5 className='active'>All time</h5>
          <h5>Last week</h5>
          <h5>Last month</h5>
        </div>
    
        <div className='leaderboardItemsWrap'>
          {renderLeaderboardItems()}
        </div>
      </div>
    </div>
  );
};

export default GlobalLeaderboard;