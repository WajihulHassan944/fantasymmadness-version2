import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import Glove from "../../Assets/newFightDetails/glove.png";
const data = [
  { option: '$0 Won', style: { backgroundColor: '#FF4500', textColor: '#FFF', boxShadow: 'inset 0 0 10px #FF5733' } },
  { option: '$3 Won', style: { backgroundColor: '#1FAA59', textColor: '#FFF', boxShadow: 'inset 0 0 10px #33FF57' } },
  { option: '$5 Won', style: { backgroundColor: '#4169E1', textColor: '#FFF', boxShadow: 'inset 0 0 10px #3357FF' } },
  { option: '$10 Won', style: { backgroundColor: '#9B30FF', textColor: '#FFF', boxShadow: 'inset 0 0 10px #F333FF' } },
  { option: '$7 Won', style: { backgroundColor: '#FFD700', textColor: '#000', boxShadow: 'inset 0 0 10px #FFBD33' } },
  { option: '$200', style: { backgroundColor: '#00CED1', textColor: '#000', boxShadow: 'inset 0 0 10px #33FFF3' } }
];
const SpinWheel = () => {
  const [winner, setWinner] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (spinning) return;
    setSpinning(true);

    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <div className="sponsors-wrap " style={{ background: '#fff' , paddingTop:'140px',paddingBottom:'0', minHeight:'80vh'}}>
   <img src="https://ufcfightclub.com/assets/ufc2/patterns/double_black_top_right.svg" alt="design" className='toabsolutedesign'/>
   <img src={Glove} alt="glove" className='bottom-glove' />
      <div className="rewards-container-parent mywheel">
     <div className='spin-wheel-text '>
      <h1 style={{ textTransform: 'uppercase' }}>Win up to $200!</h1>
      <h2 style={{ textTransform: 'uppercase', color:'#fff' }}>By Spinning the Wheel!</h2>
        {winner && <h3 className="reward-description winner-text" style={{color:"#fff", marginTop:'1px',  fontSize:'23px', marginBottom:'20px'}}>Result: {winner}</h3>}
     
        <button onClick={handleSpinClick} disabled={spinning} className="spin-button">
            Spin 
          </button>
    
  
</div>
        <div className="spin-wheel-wrap">
        <div style={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)', 
  borderRadius: '50%'
  , padding:'0',
}}>
  <Wheel
    mustStartSpinning={mustSpin}
    prizeNumber={prizeNumber}
    data={data}
    radiusLineColor={["#ccc"]}
    radiusLineWidth={10}
    innerBorderColor={["#ccc"]}
    outerBorderColor="#ccc"
    innerBorderWidth={15}
    outerBorderWidth={10}
    fontFamily="UfcSansRegular"
    onStopSpinning={() => {
      setMustSpin(false);
      setSpinning(false);
      setWinner(data[prizeNumber].option);
    }}
  />
</div>
</div>
      </div>
    </div>
  );
};

export default SpinWheel;
