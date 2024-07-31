import React from 'react'
import "./HowToPlay.css";
const HowToPlay = () => {
  return (
    <div className='howtoplay-wrapper'>
      <h1>How to play</h1>
      <p>To play, users need to make predictions on fights. Points are awarded based on the accuracy of these predictions: 5 points for correctly picking the fight winner, 2 points for predicting the method of victory, and 3 points for the round in which the fight ends. If a fight results in a draw or no contest, no points are awarded. In the case of a disqualification, the winner earns 5 points and the round receives 3 points, but no additional bonuses are given. The scoring system is designed to reward thoughtful
       predictions without favoring any specific outcome, encouraging users to make genuine choices based on their expectations of the fights.
      </p>
    </div>
  )
}

export default HowToPlay
