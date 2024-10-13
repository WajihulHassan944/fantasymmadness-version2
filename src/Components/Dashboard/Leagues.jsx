import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Leagues = () => {
  const user = useSelector((state) => state.user); // Access user details from Redux store
  const [affiliates, setAffiliates] = useState([]);
  const navigate = useNavigate();

  // Fetch affiliates from the API
  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const response = await fetch('https://fantasymmadness-game-server-three.vercel.app/affiliates');
        const data = await response.json();
        setAffiliates(data);
      } catch (error) {
        console.error('Error fetching affiliates:', error);
      }
    };
    
    fetchAffiliates();
  }, []);

  // Handle join league action
  const handleJoinLeague = async (affiliate) => {
    const userId = user._id;
    const userEmail = user.email;

    try {
      const response = await fetch(`https://fantasymmadness-game-server-three.vercel.app/affiliate/${affiliate._id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, userEmail }),
      });

      if (response.ok) {
        alert('Successfully joined the league');
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`${data.message}`);
      }
    } catch (error) {
      console.error('Error joining league:', error);
    }
  };

  if (!user || !user.firstName) {
    return <div>Loading...</div>;
  }

  return (
    <div className='userdashboard yourFightsWrapper'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={user.profileUrl} alt="Logo" data-aos="zoom-in" />
        </div>
        <h3 data-aos="zoom-in"><span className='toRemove'>Member Name:</span> {user.firstName} {user.lastName}</h3>
        <h3 data-aos="zoom-in"><span className='toRemove'>Current </span>Plan: {user.currentPlan}</h3>
      </div>

      <div className='fightsWrap myspecialpromotion' style={{ marginTop: '30px' }}>
        <div className='completedFights fightscontainer'>
          <h1 className='fightsheadingtwo'>Joined Leagues</h1>

          {/* Render leagues user has joined */}
          {affiliates.map((affiliate) => {
            const userInLeague = affiliate.usersJoined.some((joinedUser) => joinedUser.userId === user._id);

            if (userInLeague) {
              return (
                <div key={affiliate._id} className="fightItem" onClick={() => navigate('/UserDashboard')}>
                  <div className='fightItemOne' style={{position:'relative'}}>

<div className='imgWrapLeague' style={{position:"absolute" , top:'-6px' , left:'-11px' , width:'60px' , height:'60px' , borderRadius:'50%',zIndex:'99999',
border:'2px solid #ccc', overflow:'hidden' }}>
    <img src={affiliate.profileUrl} style={{width:'100%' , height:'100%' , objectFit:'cover' , zIndex:'99999'}} />
</div>

                    <div className={`transformed-div`}>
                      <h1 style={{ marginLeft: '36%', fontSize: '20px', fontFamily:'monospace', color: '#fff' }}>
                        {affiliate.firstName} {affiliate.lastName}
                      </h1>
                    </div>
                    <div className="transformed-div-two">
                      <div className='transformed-div-two-partOne'>
                        <h1>Users: {affiliate.usersJoined.length}</h1>
                      </div>
                      <div className='transformed-div-two-partTwo'>
                        <p>Joined: {new Date(affiliate.usersJoined.find((joinedUser) => joinedUser.userId === user._id).joinedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>

        <div className='pendingFights fightscontainer'>
          <h1 className='fightsheadingthree'>Open Leagues</h1>

          {/* Render open leagues user can join */}
          {affiliates.map((affiliate) => {
            const userInLeague = affiliate.usersJoined.some((joinedUser) => joinedUser.userId === user._id);

            if (!userInLeague) {
              return (
                <div key={affiliate._id} className="fightItem">
                <div className='fightItemOne' style={{position:'relative'}}>

<div className='imgWrapLeague' style={{position:"absolute" , top:'-6px' , left:'-11px' , width:'60px' , height:'60px' , borderRadius:'50%',zIndex:'99999',
border:'2px solid #ccc', overflow:'hidden' }}>
    <img src={affiliate.profileUrl} style={{width:'100%' , height:'100%' , objectFit:'cover' , zIndex:'99999'}} />
</div>

                    <div className={`transformed-div`}>
                      <h1 style={{ marginLeft: '36%', fontSize: '20px', fontFamily:'monospace', color: '#fff' }}>
                        {affiliate.firstName} {affiliate.lastName}
                      </h1>
                    </div>
                         <div className="transformed-div-two">
                      <div className='transformed-div-two-partOne'>
                        <h1>Users joined: {affiliate.usersJoined.length}</h1>
                      </div>
                      <div className='transformed-div-two-partTwo'>
                        <p onClick={() => handleJoinLeague(affiliate)} style={{color:"blue"}}>Join Now</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Leagues;
