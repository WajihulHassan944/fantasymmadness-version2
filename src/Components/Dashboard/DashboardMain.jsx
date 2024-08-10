import React from 'react'
import Dashboard from './Dashboard'
import FightDetails from './FightDetails'
import FightCosting from './FightCosting'
import PurchaseTokensIntimation from './PurchaseTokensIntimation'
import MakePredictions from '../MakePredictions/MakePredictions'
import FightLeaderboard from '../GlobalLeaderboard/FightLeaderboard'
import FinishedFightUserBoard from '../FinishedFightUserBoard/FinishedFightUserBoard'

const DashboardMain = () => {
  return (
    <div>
    <FinishedFightUserBoard />

    <Dashboard />
    <FightDetails />
    <FightCosting />
    <PurchaseTokensIntimation />
    <MakePredictions />
    <FightLeaderboard />

    </div>
  )
}

export default DashboardMain
