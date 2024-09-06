import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatches } from '../../Redux/matchSlice';

import "../YourFights/YourFights.css";
import Logo from "../../Assets/fighterOne.png";
const AffiliateDashboard = () => {
    
  const affiliate = useSelector((state) => state.affiliateAuth.userAffiliate);
 
  const dispatch = useDispatch();
  
  const matches = useSelector((state) => state.matches.data);
  const matchStatus = useSelector((state) => state.matches.status);
  
  useEffect(() => {
    if (matchStatus === 'idle') {
      dispatch(fetchMatches());
    }
  }, [matchStatus, dispatch]);
  

  if (!affiliate) {
    return <div>Loading...</div>;
  }

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const hours = parseInt(hour);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12;  // Convert to 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  };
  
    return (
      <div className='userdashboard yourFightsWrapper'>
        <div className='member-header' style={{marginBottom:'20px'}}>
          <div className='member-header-image'>
            <img src={affiliate.profileUrl} alt="Logo" />
          </div>
          <h3><span className='toRemove'>Affiliate Name:</span>{affiliate.firstName} {affiliate.lastName}</h3>
          <h3>Balance: --</h3>
        </div>
      
      
  
  
  
  
  
  
  
  
  
  
  
  
  <div className='fightsWrap'>
  
  






  <div className='completedFights fightscontainer'>
  <h1 className='fightsheadingtwo'>ALL SHADOW FIGHTS</h1>

  {matches && matches
    .filter(match => match.matchType === "SHADOW")  // Filter for SHADOW matches
    .map((match, index) => (
      <div className="fightItem" key={index}>
        <div className='fightersImages'>
          <div className='fighterOne'>
            <img src={match.fighterAImage} alt={match.matchFighterA} />
          </div>
          <div className='fighterTwo'>
            <img src={match.fighterBImage} alt={match.matchFighterB} />
          </div>
        </div>
        <div className='fightItemOne'>
          <div className="transformed-div">
            <h1>{match.matchFighterA} -VS- {match.matchFighterB}</h1>
          </div>
          <div className="transformed-div-two">
            <div className='transformed-div-two-partOne'>
              <h1>{formatTime(match.matchTime)} est</h1> {/* Format time here */}
            </div>
            <div className='transformed-div-two-partTwo'>
              <p >
                {new Date(match.matchDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
  ))}
</div>

  
  
  <div className='pendingFights fightscontainer'>
    <h1 className='fightsheadingthree'>Your Promotion Fights</h1>
  
                <div className="fightItem" >
                  <div className='fightersImages'>
                    <div className='fighterOne'>
                      <img src={Logo} alt="Fighter One" />
                    </div>
                    <div className='fighterTwo'>
                      <img src={Logo} alt="Fighter Two" />
                    </div>
                  </div>
                  <div className='fightItemOne'>
                    <div className="transformed-div">
                      <h1>Wajih -VS- Abdullah</h1>
                    </div>
                    <div className="transformed-div-two">
                      <div className='transformed-div-two-partOne'>
                        <h1>10:21am est</h1>
                      </div>
                      <div className='transformed-div-two-partTwo'>
                        <p style={{ marginLeft: '-15px' }}>
                          22:13
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='fightItemTwo'>
                    <div className="transformed-three">
                      <div className='transformedDivBox'>HP</div>
                      <div className='transformedDivBox'>BP</div>
                      <div className='transformedDivBox'>TP</div>
                      <div className='transformedDivBox'>RW</div>
                      <div className='transformedDivBox'>KO</div>
                      <div className='transformedDivBox'>boxing finished </div>
                    </div>
                    <div className="transformed-div-four">
                      <h1>Players</h1>
                      <p>400</p>
                    </div>
                  </div>
                  <div className="transformed-five">
                    <div className='transformedDivBox'>HP</div>
                    <div className='transformedDivBox'>BP</div>
                    <div className='transformedDivBox'>TP</div>
                    <div className='transformedDivBox'>RW</div>
                    <div className='transformedDivBox'>KO</div>   <div className='transformedDivBoxLast'>Buy in <br /> $330</div>
           
                  </div>
                  
                  <div className="transformed-Six">
                    <span>Wajih</span>
                    <span>Wajih</span>
                    <span>Wajih</span>
                    <span>Wajih</span>
                  </div>
                </div>
           
        
  </div>
  
  
  
  
  
  
  
  
  
  
  
  
  </div>
      </div>
  
    )
  }
  

export default AffiliateDashboard
