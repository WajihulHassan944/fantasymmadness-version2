import React from 'react'
import "./style.css";
import one from "../../Assets/calender/four.png";
import two from "../../Assets/calender/six.png";

const PastFightsNew = () => {

const fightData = [
    { date: "06", month: "JUN" },
    { date: "08", month: "JUN" },
    { date: "08", month: "JUN" },
    { date: "13", month: "JUN" },
    { date: "15", month: "JUN" },
    { date: "19", month: "JUN" },
    { date: "22", month: "JUN" },
    { date: "29", month: "JUN" },
];
  return (
    <div className='past-fights-container' style={{height:'100vh'}}>
      <img src={one} alt="one" className='one-in-past' />
      <img src={two} alt="one" className='two-in-past' />
      <img src={two} alt="one" className='three-in-past' />

      <h1>Past Fights</h1>
      <div className='fights-grid'>
    <div className='column one'>
        {fightData.slice(0, 4).map((fight, index) => (
            <div key={index} className='fight-card'>
                <div className='fight-date'>
                    <span className='date'>{fight.date}</span>
                    <span className='month'>{fight.month}</span>
                </div>
                <div className='fight-info'>
                    <h2>LOREM IPSUM</h2>
                    <p>ADD VENUE | 1:00 PM</p>
                </div>
            </div>
        ))}
    </div>

    <div className='column two'>
        {fightData.slice(4, 8).map((fight, index) => (
            <div key={index} className='fight-card'>
                <div className='fight-date'>
                    <span className='date'>{fight.date}</span>
                    <span className='month'>{fight.month}</span>
                </div>
                <div className='fight-info'>
                    <h2>LOREM IPSUM</h2>
                    <p>ADD VENUE | 1:00 PM</p>
                </div>
            </div>
        ))}
    </div>
</div>

<div className="nav-icons-past-fights">
    <i className="fa fa-chevron-left left-icon"></i>
    <i className="fa fa-chevron-right right-icon"></i>
</div>


    </div>
  )
}

export default PastFightsNew
