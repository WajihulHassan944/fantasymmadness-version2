import React from 'react';
import "../YourFights/YourFights.css";
import Logo from "../../Assets/fighterOne.png";
const AffiliateDashboard = () => {
    
    return (
      <div className='userdashboard yourFightsWrapper'>
        <div className='member-header' style={{marginBottom:'20px'}}>
          <div className='member-header-image'>
            <img src={Logo} alt="Logo" />
          </div>
          <h3><span className='toRemove'>Affiliate Name:</span> Wajih</h3>
          <h3>Balance: $2500</h3>
        </div>
      
      
  
  
  
  
  
  
  
  
  
  
  
  
  <div className='fightsWrap'>
  
  
  <div className='completedFights fightscontainer'>
    <h1 className='fightsheadingtwo'>YOUR COMPLETED FIGHTS</h1>
  
          <div className="fightItem"  >
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
                  <h1>10:17Am est</h1>
                </div>
                <div className='transformed-div-two-partTwo'>
                  <p style={{marginLeft:'-15px'}}>
                   22:41
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
                <div className='transformedDivBox'>boxing pending </div>
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
              <div className='transformedDivBox'>KO</div>
              <div className='transformedDivBoxLast'>Buy in <br /> $330</div>
            </div>

            <div className="transformed-Six">
                    <span>Wajih</span>
                    <span>Wajih</span>
                    <span>Wajih</span>
                    <span>Wajih</span>
                  </div>
               
          </div>
        
    
  </div>
  
  
  
  
  <div className='pendingFights fightscontainer'>
    <h1 className='fightsheadingthree'>Your Pending Fights</h1>
  
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
