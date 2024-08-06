import React from 'react'
import CreateAccount from './CreateAccount'
import Thankyou from "./Thankyou"
import UploadAvatar from './UploadAvatar'
import Membership from './Membership'
import MembershipCheckout from './MembershipCheckout'
const Registration = () => {
  return (
    <div>
    <CreateAccount />
    <Thankyou />
    <UploadAvatar />
    <Membership />
    <MembershipCheckout />
    </div>
  )
}

export default Registration
