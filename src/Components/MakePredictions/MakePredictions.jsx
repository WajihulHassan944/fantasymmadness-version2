import React from 'react'
import "./MakePredictions.css";
import Logoimage from "../../Assets/myimg.jpg";
import FighterOne from "../../Assets/fighterOne.png";
import FightTwo from "../../Assets/fighterTwo.png";
import PunchHand from "../../Assets/hand-removebg-preview.png";
const MakePredictions = () => {

  return (
    <div className='fightCosting makePredictions'>
        
    <div className='member-header'>
      <div className='member-header-image'>
        <img src={Logoimage} alt="Logo" />
      </div>
      <h3>Member Name - upgrade</h3>
      <h3>Current plan: None</h3>
    </div>

    <div className='fightwalletWrap'>
      <div className='fightWallet'>
      <h1><i className="fa fa-shopping-bag" aria-hidden="true"></i> Fight Wallet</h1>
      <h2>Tokens Remaining: <span>35</span></h2>
  </div>
</div>


<div className='fightDetailsContainer'>
    
      
  

      <h1 className='fightTypeInFightDetails'>Fight type: <span>Boxing</span>
            - <span className='makeGreen'>Live </span> - <span>Fighter Name </span> VS <span> Fighter Name </span>
            </h1>

      <div className='beiginningTimeFight'>
          <h1>Will Begin in - </h1>
          <p style={{color:"#38b90c"}}>00:22:14</p>
          </div>



          <div className='fightersImagesInFightDetails'>
         <div className='flexColumn'> <div className='imgWrapFights'><img src={FighterOne} /></div>
         <h1 className='fightTypeInFightDetails'>Fighter Name</h1>
         </div>

          <h1>VS</h1>

          <div className='flexColumn'><div className='imgWrapFights'><img src={FightTwo} style={{border:'3px solid red'}} /></div>
          <h1 className='fightTypeInFightDetails'>Fighter Name</h1></div>
      </div>
</div>




<div className='roundsWrapper'>
   
    <div className='roundActual'>
   <div className='roundHeading'> <h1>Round 1</h1>  </div>
    <div className='roundInputWrap'>
        <div className='roundInput'>
            <div className='roundInputDivOne'><i class="fa fa-caret-left" aria-hidden="true"></i>  <input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>HP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> <i class="fa fa-caret-right" aria-hidden="true"></i></div>
            
        </div>
        <div className='roundInput'>
            <div className='roundInputDivOne'><i class="fa fa-caret-left" aria-hidden="true"></i>  <input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>BP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> <i class="fa fa-caret-right" aria-hidden="true"></i></div>
            
        </div>
        <div className='roundInput' style={{border:'2px dashed #ccc' , borderRadius:'15px' , width:'80%' , padding:'5px'}}>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>TP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> </div>
            
        </div>

        <div className='roundInput' style={{paddingLeft:'40px' , paddingRight:'37px'}}>
            <div className='roundInputDivOne'> <input style={{border:'2px solid #2a8adb' , background:'#02fc1f' , textAlign:'center'
            , color:'#025204' , fontSize:'22px'}} value='RW' disabled /></div>
            <div className='roundinput-image'> <h2 style={{marginTop:'8px'}}>- OR -</h2> </div>
            <div className='roundInputDivOne'><input style={{border:'2px solid #2a8adb' , background:'#fff' , textAlign:'center'
            , color:'red' , fontSize:'22px'
            }} value='RL' disabled /></div>
            
        </div>

        <div className='roundInputSpecial'>
        <div className='roundInputDivOne'> <input style={{border:'2px solid #95a04d' , background:'#000300' , textAlign:'center'
            , color:'#025204' , fontSize:'22px' , marginBottom:'5px'}} value='KO' disabled /></div>
            <div className='roundInputDivOne'><input style={{border:'2px solid #95a04d' , background:'#fff' , textAlign:'center'
            , color:'#2e5e6f' , fontSize:'22px'
            }} value='SP' disabled /></div>
            
        </div>

    </div>
    </div>
















   
    <div className='roundActual'>
   <div className='roundHeading'> <h1>Round 2</h1>  </div>
    <div className='roundInputWrap'>
        <div className='roundInput'>
            <div className='roundInputDivOne'><i class="fa fa-caret-left" aria-hidden="true"></i>  <input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>HP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> <i class="fa fa-caret-right" aria-hidden="true"></i></div>
            
        </div>
        <div className='roundInput'>
            <div className='roundInputDivOne'><i class="fa fa-caret-left" aria-hidden="true"></i>  <input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>BP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> <i class="fa fa-caret-right" aria-hidden="true"></i></div>
            
        </div>
        <div className='roundInput' style={{border:'2px dashed #ccc' , borderRadius:'15px' , width:'80%' , padding:'5px'}}>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>TP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> </div>
            
        </div>

        <div className='roundInput' style={{paddingLeft:'40px' , paddingRight:'37px'}}>
            <div className='roundInputDivOne'> <input style={{border:'2px solid #2a8adb' , background:'#02fc1f' , textAlign:'center'
            , color:'#025204' , fontSize:'22px'}} value='RW' disabled /></div>
            <div className='roundinput-image'> <h2 style={{marginTop:'8px'}}>- OR -</h2> </div>
            <div className='roundInputDivOne'><input style={{border:'2px solid #2a8adb' , background:'#fff' , textAlign:'center'
            , color:'red' , fontSize:'22px'
            }} value='RL' disabled /></div>
            
        </div>

        <div className='roundInputSpecial'>
        <div className='roundInputDivOne'> <input style={{border:'2px solid #95a04d' , background:'#000300' , textAlign:'center'
            , color:'#025204' , fontSize:'22px' , marginBottom:'5px'}} value='KO' disabled /></div>
            <div className='roundInputDivOne'><input style={{border:'2px solid #95a04d' , background:'#fff' , textAlign:'center'
            , color:'#2e5e6f' , fontSize:'22px'
            }} value='SP' disabled /></div>
            
        </div>

    </div>
    </div>












   
    <div className='roundActual'>
   <div className='roundHeading'> <h1>Round 3</h1>  </div>
    <div className='roundInputWrap'>
        <div className='roundInput'>
            <div className='roundInputDivOne'><i class="fa fa-caret-left" aria-hidden="true"></i>  <input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>HP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> <i class="fa fa-caret-right" aria-hidden="true"></i></div>
            
        </div>
        <div className='roundInput'>
            <div className='roundInputDivOne'><i class="fa fa-caret-left" aria-hidden="true"></i>  <input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>BP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> <i class="fa fa-caret-right" aria-hidden="true"></i></div>
            
        </div>
        <div className='roundInput' style={{border:'2px dashed #ccc' , borderRadius:'15px' , width:'80%' , padding:'5px'}}>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #2a8adb'}} /></div>
            <div className='roundinput-image'> <h2>TP</h2> <div className='roundInputImgWrap'> <img src={PunchHand} /> </div></div>
            <div className='roundInputDivOne'><input type='number' style={{border:'2px solid #e1130c'}} /> </div>
            
        </div>

        <div className='roundInput' style={{paddingLeft:'40px' , paddingRight:'37px'}}>
            <div className='roundInputDivOne'> <input style={{border:'2px solid #2a8adb' , background:'#02fc1f' , textAlign:'center'
            , color:'#025204' , fontSize:'22px'}} value='RW' disabled /></div>
            <div className='roundinput-image'> <h2 style={{marginTop:'8px'}}>- OR -</h2> </div>
            <div className='roundInputDivOne'><input style={{border:'2px solid #2a8adb' , background:'#fff' , textAlign:'center'
            , color:'red' , fontSize:'22px'
            }} value='RL' disabled /></div>
            
        </div>

        <div className='roundInputSpecial'>
        <div className='roundInputDivOne'> <input style={{border:'2px solid #95a04d' , background:'#000300' , textAlign:'center'
            , color:'#025204' , fontSize:'22px' , marginBottom:'5px'}} value='KO' disabled /></div>
            <div className='roundInputDivOne'><input style={{border:'2px solid #95a04d' , background:'#fff' , textAlign:'center'
            , color:'#2e5e6f' , fontSize:'22px'
            }} value='SP' disabled /></div>
            
        </div>

    </div>
    </div>
    

</div>





  </div>
)
}

export default MakePredictions
