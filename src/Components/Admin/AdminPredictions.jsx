import React from 'react'
import "./AdminPredictions.css";
import FighterOne from "../../Assets/fighterOne.png";
import FighterTwo from "../../Assets/fighterTwo.png";

const AdminPredictions = () => {
  return (
    <div className='adminPredictions'>
      
    <h1>Live &nbsp; &nbsp; &nbsp;Fight title &nbsp; - &nbsp; Boxing &nbsp;&nbsp;&nbsp; Round 2</h1>
    <div className='adminPredictionsHeader'>
         <div className='imagesWrapperAdminPredictions'>
            <div className='imgToWrap'><img src={FighterOne} /></div>
            <div className='imgToWrap'><img src={FighterTwo} /></div>
        </div>
      <h2>Player A -VS Player B - Round 2</h2>
    </div>

    <div className='actualPredictionsWrapper'>
       
    <div className='actualAdminPredictions'>
            <h1 className='subHeading2'>Fighter 1</h1>
            
            <div className='adminPredictionsButtonsWrapper'>
             
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundBlue'>
                    <h1>HP</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp '>
               <div className='ButtonBoxAdmin makeBackgroundBlue'>
                    <h1>BP</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundBlue'>
                    <h1>TP</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundBlue'>
                    <h1>RW</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundBlue'>
                    <h1>KO</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>

            </div>
        </div>

        <div className='actualAdminPredictions'>
            <h1 className='subHeading2'>Fighter 2</h1>
            
            <div className='adminPredictionsButtonsWrapper'>
             
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundRed'>
                    <h1>HP</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundRed'>
                    <h1>BP</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundRed'>
                    <h1>TP</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundRed'>
                    <h1>RW</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>
              <div className='buttonBoxWrapp'>
               <div className='ButtonBoxAdmin makeBackgroundRed'>
                    <h1>KO</h1>
                </div>
                <h1 className='outputBox'>11</h1>
                </div>

            </div>
        </div>


<div className='buttonPrevNextWrap'>
    <button className='btn-grad'>Prev</button>
    <button className='btn-grad'>Next</button>
</div>

    </div>

    </div>
  )
}

export default AdminPredictions
