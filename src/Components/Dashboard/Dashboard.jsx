import React from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import Logoimage from '../../Assets/myimg.jpg';
import FighterOne from '../../Assets/fighterOne.png';
import FighterTwo from '../../Assets/fighterTwo.png';

const Dashboard = () => {
  const user = useSelector((state) => state.user); // Access user details from Redux store

  return (
    <div className='userdashboard'>
      <div className='member-header'>
        <div className='member-header-image'>
          <img src={Logoimage} alt="Logo" />
        </div>
        <h3>Member Name: {user.firstName} {user.lastName} {user.id} - upgrade</h3>
        <h3>Current plan: None</h3>
      </div>

      <div className='fightwalletWrap'>
        <div className='fightWallet'>
          <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
          <h2>Tokens Remaining: <span>35</span></h2>
        </div>
      </div>

      <div className='fightsWrap'>
        <div className='upcomingFights fightscontainer'>
          <h1 className='fightsheadingone'>UPCOMING FIGHTS / ACTIVE FIGHTS</h1>
          <div className="fightItem">
            <div className='fightersImages'>
              <div className='fighterOne'><img src={FighterOne} alt="Fighter One" /></div>
              <div className='fighterTwo'><img src={FighterTwo} alt="Fighter Two" /></div>
            </div>
            <div className='fightItemOne'>
              <div className="transformed-div"><h1>Player A -VS Player B</h1></div>
              <div className="transformed-div-two">
                <div className='transformed-div-two-partOne'>
                  <h1>6:00pm est</h1>
                </div>
                <div className='transformed-div-two-partTwo'>
                  <p>6/2/2024</p>
                  <h1>LIVE</h1>
                </div>
              </div>
            </div>
            <div className='fightItemTwo'>
              <div className="transformed-div-three"><p>Additional Fight Info will be added later</p></div>
              <div className="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>
          </div>
        </div>

        <div className='completedFights fightscontainer'>
          <h1 className='fightsheadingtwo'>YOUR COMPLETED FIGHTS</h1>
          <div className="fightItem">
            <div className='fightersImages'>
              <div className='fighterOne'><img src={FighterOne} alt="Fighter One" /></div>
              <div className='fighterTwo'><img src={FighterTwo} alt="Fighter Two" /></div>
            </div>
            <div className='fightItemOne'>
              <div className="transformed-div"><h1>Player A -VS Player B</h1></div>
              <div className="transformed-div-two">
                <div className='transformed-div-two-partOne'>
                  <h1>Your rank #2</h1>
                </div>
                <div className='transformed-div-two-partTwo'>
                  <p>Points</p>
                  <h1>676</h1>
                </div>
              </div>
            </div>
            <div className='fightItemTwo'>
              <div className="transformed-three">
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
              </div>
              <div className="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>
            <div className="transformed-five">
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
            </div>
          </div>
        </div>

        <div className='pendingFights fightscontainer'>
          <h1 className='fightsheadingthree'>Your Pending Fights</h1>
          <div className="fightItem">
            <div className='fightersImages'>
              <div className='fighterOne'><img src={FighterOne} alt="Fighter One" /></div>
              <div className='fighterTwo'><img src={FighterTwo} alt="Fighter Two" /></div>
            </div>
            <div className='fightItemOne'>
              <div className="transformed-div"><h1>Player A -VS Player B</h1></div>
              <div className="transformed-div-two">
                <div className='transformed-div-two-partOne'>
                  <h1>6:00pm est</h1>
                </div>
                <div className='transformed-div-two-partTwo'>
                  <p>Begins in 2 hours 42 min</p>
                </div>
              </div>
            </div>
            <div className='fightItemTwo'>
              <div className="transformed-three">
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
                <div className='transformedDivBox'></div>
              </div>
              <div className="transformed-div-four"><h1>Players</h1><p>400</p></div>
            </div>
            <div className="transformed-five">
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
              <div className='transformedDivBox'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
