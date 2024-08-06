import React from 'react'
import "./UploadAvatar.css";
import Image from "../../Assets/logo.png";
const UploadAvatar = () => {
  return (
    <div className='uploadAvatar'>
     

     <h1>Registration Confirmed <br /> Upload your player image avatar below </h1>
     <img src={Image} />
     
     <button className='btn-grad'>Browse</button>
    </div>
  )
}

export default UploadAvatar
