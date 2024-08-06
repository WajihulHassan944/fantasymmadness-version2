import React from 'react'
import Dashboard from './Dashboard'
import FightDetails from './FightDetails'
import FightCosting from './FightCosting'
import PurchaseTokensIntimation from './PurchaseTokensIntimation'
import MakePredictions from '../MakePredictions/MakePredictions'

const DashboardMain = () => {
  return (
    <div>
    <Dashboard />
    <FightDetails />
    <FightCosting />
    <PurchaseTokensIntimation />
    <MakePredictions />


    </div>
  )
}

export default DashboardMain
