import React from 'react';
import FighterOne from "../../Assets/fighterOne.png";
import Logoimage from "../../Assets/myimg.jpg";
import FightTwo from "../../Assets/fighterTwo.png";
import "./FinishedFightUserBoard.css";

const FinishedFightUserBoard = () => {
  return (
    <div className='finishedFightUserBoard'>
      <div className='fightLeaderboard'>
        <div className='fightDetails global-leaderboard'>
          <div className='member-header'>
            <div className='member-header-image'>
              <img src={Logoimage} alt="Logo" />
            </div>
            <h3>Member Name - upgrade</h3>
            <h3>Current plan: None</h3>
          </div>

          <div className='fightwalletWrap'>
            <div className='totalPoints'>
              <h1 className='fightTypeInFightDetails'>
                Fight type: <span>Boxing</span>
                - <span style={{color:"#38b90c"}}>Live </span> - <span>Fighter Name </span> VS <span> Fighter Name </span>
              </h1>
              <h1 style={{textAlign:'left'}}>
                POT: <span style={{color:"#38b90c"}}>10</span>
                &nbsp;Players: <span style={{color:"#38b90c"}}>500</span>
              </h1>
            </div>
            <div className='fightWallet'>
              <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
              <h2>Tokens Remaining: <span>35</span></h2>
            </div>
          </div>

          <div className='homeThird'>
            <div className='fightersImagesInFightDetails'>
              <div className='flexColumn'>
                <div className='imgWrapFights' style={{border:'none'}}>
                  <img src={FighterOne} style={{border:'3px solid blue'}} alt="Fighter One" />
                </div>
                <h1 className='fightTypeInFightDetails'>Fighter Name</h1>
              </div>
              <h1>VS</h1>
              <div className='flexColumn'>
                <div className='imgWrapFights' style={{border:'none'}}>
                  <img src={FightTwo} style={{border:'3px solid red'}} alt="Fighter Two" />
                </div>
                <h1 className='fightTypeInFightDetails'>Fighter Name</h1>
              </div>
            </div>
            <div className="videoWrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/e3osGj488Us"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className='leaderboardHeading'>
              <h3>FIGHT COMPLETED</h3>
            </div>

            <div className='roundResultsWrapper'>

                <div className='roundResultDiv'>
                    <h1>Round 1 Complete</h1>
                    <div className='line'></div>
                    <div className='scoresWrapper'>
                        
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>100</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>500</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h3>Points Total</h3>
                            <div className='scoreBoxSpecial'>
                                <p>649</p>
                            </div>
                        </div>
                    </div>
                </div>


                
                <div className='roundResultDiv'>
                    <h1>Round 2 Complete</h1>
                    <div className='line'></div>
                    <div className='scoresWrapper'>
                        
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>100</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>500</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h3>Points Total</h3>
                            <div className='scoreBoxSpecial'>
                                <p>649</p>
                            </div>
                        </div>
                    </div>
                </div>


                
                <div className='roundResultDiv'>
                    <h1>Round 3 Complete</h1>
                    <div className='line'></div>
                    <div className='scoresWrapper'>
                        
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>100</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>500</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h3>Points Total</h3>
                            <div className='scoreBoxSpecial'>
                                <p>649</p>
                            </div>
                        </div>
                    </div>
                </div>


                
                <div className='roundResultDiv'>
                    <h1>Round 4 Complete</h1>
                    <div className='line'></div>
                    <div className='scoresWrapper'>
                        
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>100</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>500</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h3>Points Total</h3>
                            <div className='scoreBoxSpecial'>
                                <p>649</p>
                            </div>
                        </div>
                    </div>
                </div>


                
                <div className='roundResultDiv'>
                    <h1>Round 5 Complete</h1>
                    <div className='line'></div>
                    <div className='scoresWrapper'>
                        
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>100</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>500</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h3>Points Total</h3>
                            <div className='scoreBoxSpecial'>
                                <p>649</p>
                            </div>
                        </div>
                    </div>
                </div>


                
                <div className='roundResultDiv'>
                    <h1>Round 6 Complete</h1>
                    <div className='line'></div>
                    <div className='scoresWrapper'>
                        
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h2>HP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>BP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>TP</h2>
                            <div className='scoreBox'>
                                <p>9</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>100</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>RW</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>500</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>KO</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div><div className='scoresOfRound'>
                            <h2>SP</h2>
                            <div className='scoreBox'>
                                <p>0</p>
                            </div>
                        </div>
                        <div className='scoresOfRound'>
                            <h3>Points Total</h3>
                            <div className='scoreBoxSpecial'>
                                <p>649</p>
                            </div>
                        </div>
                    </div>
                </div>

<div className='winnerDiv'>
    <div className='winnerSuDivbOne'>
        <div className='winnerImg'>
            <img src={FighterOne} />
        </div>
        <div className='winnerDetails'>
            <h1>Winner</h1>
            <h2>Fighter Name</h2>
        </div>
    </div>

    <div className='winnerSibDivTwo'>
        <h1>Points Grand Total</h1>
        <h2>678</h2>
    </div>
</div>



            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default FinishedFightUserBoard;
